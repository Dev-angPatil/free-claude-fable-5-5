// High-Precision Neo-Brutalist 60FPS Flappy Bird Engine
// Strict adherence to RawBlock / Electric Volt monochrome aesthetics

export interface Pipe {
  x: number;
  topHeight: number;
  bottomHeight: number;
  passed: boolean;
}

export type GameState = 'idle' | 'playing' | 'gameover' | 'won';

export interface GameEngineOptions {
  canvas: HTMLCanvasElement;
  onScore: (score: number, brightness: number) => void;
  onCrash: (finalScore: number) => void;
  onWin: () => void;
  onStateChange: (state: GameState) => void;
}

export class FlappyEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private onScore: (score: number, brightness: number) => void;
  private onCrash: (finalScore: number) => void;
  private onWin: () => void;
  private onStateChange: (state: GameState) => void;

  // Game Loop
  private animationFrameId: number | null = null;
  private state: GameState = 'idle';
  private frameCount = 0;

  // World Constants
  private readonly width = 400;
  private readonly height = 560;
  private readonly gravity = 0.44;
  private readonly jumpForce = -7.4;
  private readonly pipeSpeed = 2.4;
  private readonly pipeGap = 136;
  private readonly pipeWidth = 56;
  private readonly pipeInterval = 95; // frames between pipes

  // Entities
  private bird = {
    x: 80,
    y: 250,
    vy: 0,
    width: 32,
    height: 24,
    rotation: 0,
    wingAngle: 0,
  };
  private pipes: Pipe[] = [];
  public score = 0;

  // Custom Audio Elements (Optional)
  private jumpAudio: HTMLAudioElement | null = null;
  private scoreAudio: HTMLAudioElement | null = null;
  private crashAudio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;

  // Custom Sprites (Optional)
  private birdImg: HTMLImageElement | null = null;
  private pipeTopImg: HTMLImageElement | null = null;
  private pipeBottomImg: HTMLImageElement | null = null;
  private bgImg: HTMLImageElement | null = null;

  constructor(options: GameEngineOptions) {
    this.canvas = options.canvas;
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('Could not get 2D context');
    this.ctx = context;

    this.onScore = options.onScore;
    this.onCrash = options.onCrash;
    this.onWin = options.onWin;
    this.onStateChange = options.onStateChange;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.initAssets();
    this.reset();
  }

  // Load custom assets with fallback detection
  private initAssets() {
    // Try images
    const loadImg = (src: string) => {
      const img = new Image();
      img.src = src;
      return img;
    };
    this.birdImg = loadImg('/assets/flappy/bird.png');
    this.pipeTopImg = loadImg('/assets/flappy/pipe-top.png');
    this.pipeBottomImg = loadImg('/assets/flappy/pipe-bottom.png');
    this.bgImg = loadImg('/assets/flappy/background.png');

    // Try audios
    const loadAudio = (src: string) => {
      try {
        const audio = new Audio(src);
        audio.preload = 'auto';
        return audio;
      } catch {
        return null;
      }
    };
    this.jumpAudio = loadAudio('/assets/flappy/jump.mp3');
    this.scoreAudio = loadAudio('/assets/flappy/score.mp3');
    this.crashAudio = loadAudio('/assets/flappy/crash.mp3');
  }

  // Web Audio Synthesizer Fallback
  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  private playSound(type: 'jump' | 'score' | 'crash') {
    try {
      if (type === 'jump' && this.jumpAudio && !isNaN(this.jumpAudio.duration)) {
        this.jumpAudio.currentTime = 0;
        this.jumpAudio.play().catch(() => this.synthSound('jump'));
        return;
      }
      if (type === 'score' && this.scoreAudio && !isNaN(this.scoreAudio.duration)) {
        this.scoreAudio.currentTime = 0;
        this.scoreAudio.play().catch(() => this.synthSound('score'));
        return;
      }
      if (type === 'crash' && this.crashAudio && !isNaN(this.crashAudio.duration)) {
        this.crashAudio.currentTime = 0;
        this.crashAudio.play().catch(() => this.synthSound('crash'));
        return;
      }
      this.synthSound(type);
    } catch {
      this.synthSound(type);
    }
  }

  private synthSound(type: 'jump' | 'score' | 'crash') {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'jump') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.12);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'score') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'crash') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public reset() {
    this.bird.x = 80;
    this.bird.y = 250;
    this.bird.vy = 0;
    this.bird.rotation = 0;
    this.pipes = [];
    this.score = 0;
    this.frameCount = 0;
    this.setState('idle');
  }

  private setState(newState: GameState) {
    this.state = newState;
    this.onStateChange(newState);
  }

  public flap() {
    if (this.state === 'idle') {
      this.setState('playing');
      this.bird.vy = this.jumpForce;
      this.playSound('jump');
    } else if (this.state === 'playing') {
      this.bird.vy = this.jumpForce;
      this.playSound('jump');
    } else if (this.state === 'gameover') {
      this.reset();
    } else if (this.state === 'won') {
      this.reset();
    }
  }

  public start() {
    if (!this.animationFrameId) {
      this.loop();
    }
  }

  public stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private loop = () => {
    this.update();
    this.draw();
    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  private update() {
    this.frameCount++;

    if (this.state === 'idle') {
      // Gentle bobbing motion
      this.bird.y = 250 + Math.sin(this.frameCount * 0.08) * 8;
      this.bird.rotation = 0;
      this.bird.wingAngle = Math.sin(this.frameCount * 0.2) * 0.4;
      return;
    }

    if (this.state === 'playing') {
      // Bird Physics
      this.bird.vy += this.gravity;
      this.bird.y += this.bird.vy;

      // Pitch angle based on velocity
      const targetRotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (this.bird.vy / 10) * (Math.PI / 4)));
      this.bird.rotation += (targetRotation - this.bird.rotation) * 0.25;
      this.bird.wingAngle = this.bird.vy < 0 ? -0.5 : 0.2;

      // Spawn pipes
      if (this.frameCount % this.pipeInterval === 0) {
        const minTop = 60;
        const maxTop = this.height - this.pipeGap - 100;
        const topHeight = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;
        const bottomHeight = this.height - topHeight - this.pipeGap;

        this.pipes.push({
          x: this.width + 10,
          topHeight,
          bottomHeight,
          passed: false,
        });
      }

      // Move & prune pipes
      for (let i = 0; i < this.pipes.length; i++) {
        const pipe = this.pipes[i];
        pipe.x -= this.pipeSpeed;

        // Score detection (bird passes pipe center)
        if (!pipe.passed && pipe.x + this.pipeWidth < this.bird.x) {
          pipe.passed = true;
          this.score += 1;
          const currentBrightness = Math.min(100, 10 + this.score);
          this.playSound('score');
          this.onScore(this.score, currentBrightness);

          if (this.score >= 100) {
            this.setState('won');
            this.onWin();
            return;
          }
        }

        // Collision detection (AABB)
        const birdLeft = this.bird.x - this.bird.width / 2 + 4;
        const birdRight = this.bird.x + this.bird.width / 2 - 4;
        const birdTop = this.bird.y - this.bird.height / 2 + 4;
        const birdBottom = this.bird.y + this.bird.height / 2 - 4;

        const pipeLeft = pipe.x;
        const pipeRight = pipe.x + this.pipeWidth;

        // Inside horizontal pipe slice
        if (birdRight > pipeLeft && birdLeft < pipeRight) {
          // Hits top pipe
          if (birdTop < pipe.topHeight) {
            this.triggerCrash();
            return;
          }
          // Hits bottom pipe
          if (birdBottom > this.height - pipe.bottomHeight) {
            this.triggerCrash();
            return;
          }
        }
      }

      // Remove offscreen pipes
      this.pipes = this.pipes.filter((p) => p.x + this.pipeWidth > -50);

      // Floor & ceiling collisions
      if (this.bird.y + this.bird.height / 2 >= this.height - 12) {
        this.bird.y = this.height - 12 - this.bird.height / 2;
        this.triggerCrash();
        return;
      }
      if (this.bird.y - this.bird.height / 2 <= 0) {
        this.bird.y = this.bird.height / 2;
        this.bird.vy = 0;
      }
    }

    if (this.state === 'gameover') {
      // Continue gravity until bird hits floor
      if (this.bird.y + this.bird.height / 2 < this.height - 12) {
        this.bird.vy += this.gravity * 1.5;
        this.bird.y += this.bird.vy;
        this.bird.rotation = Math.min(Math.PI / 2, this.bird.rotation + 0.1);
      }
    }
  }

  private triggerCrash() {
    this.setState('gameover');
    this.playSound('crash');
    this.onCrash(this.score);
  }

  private draw() {
    const { ctx, width, height } = this;

    // Background: Deep OLED Black
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // Optional custom background
    if (this.bgImg && this.bgImg.complete && this.bgImg.naturalWidth > 0) {
      ctx.drawImage(this.bgImg, 0, 0, width, height);
    } else {
      // Subtle neo-brutalist telemetry grid lines
      ctx.strokeStyle = '#181818';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    // Draw Pipes
    for (const pipe of this.pipes) {
      this.drawPipe(pipe);
    }

    // Draw Ground Line (3px Solid High-Contrast White)
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, height - 12, width, 12);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, height - 12);
    ctx.lineTo(width, height - 12);
    ctx.stroke();

    // Draw Bird
    this.drawBird();

    // Draw In-Game HUD (Monochrome RawBlock Style)
    if (this.state === 'playing') {
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${this.score}`, width / 2, 60);

      ctx.font = '12px "Space Mono", monospace';
      ctx.fillStyle = '#A0A0A0';
      ctx.fillText(`BRIGHTNESS: ${Math.min(100, 10 + this.score)}%`, width / 2, 85);
    }
  }

  private drawPipe(pipe: Pipe) {
    const { ctx, pipeWidth, height } = this;
    const hasCustomTop = this.pipeTopImg && this.pipeTopImg.complete && this.pipeTopImg.naturalWidth > 0;
    const hasCustomBottom = this.pipeBottomImg && this.pipeBottomImg.complete && this.pipeBottomImg.naturalWidth > 0;

    // Top Pipe
    if (hasCustomTop && this.pipeTopImg) {
      ctx.drawImage(this.pipeTopImg, pipe.x, 0, pipeWidth, pipe.topHeight);
    } else {
      // Neo-brutalist vector pipe top
      ctx.fillStyle = '#111111';
      ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.strokeRect(pipe.x, -3, pipeWidth, pipe.topHeight + 3);

      // Flange / Collar
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(pipe.x - 4, pipe.topHeight - 16, pipeWidth + 8, 16);
      ctx.strokeRect(pipe.x - 4, pipe.topHeight - 16, pipeWidth + 8, 16);

      // Inner mechanical slot
      ctx.fillStyle = '#000000';
      ctx.fillRect(pipe.x, pipe.topHeight - 12, pipeWidth, 8);
    }

    // Bottom Pipe
    const bottomY = height - pipe.bottomHeight;
    if (hasCustomBottom && this.pipeBottomImg) {
      ctx.drawImage(this.pipeBottomImg, pipe.x, bottomY, pipeWidth, pipe.bottomHeight);
    } else {
      ctx.fillStyle = '#111111';
      ctx.fillRect(pipe.x, bottomY, pipeWidth, pipe.bottomHeight);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.strokeRect(pipe.x, bottomY, pipeWidth, pipe.bottomHeight + 3);

      // Flange / Collar
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(pipe.x - 4, bottomY, pipeWidth + 8, 16);
      ctx.strokeRect(pipe.x - 4, bottomY, pipeWidth + 8, 16);

      // Inner mechanical slot
      ctx.fillStyle = '#000000';
      ctx.fillRect(pipe.x, bottomY + 4, pipeWidth, 8);
    }
  }

  private drawBird() {
    const { ctx, bird } = this;
    ctx.save();
    ctx.translate(bird.x, bird.y);
    ctx.rotate(bird.rotation);

    if (this.birdImg && this.birdImg.complete && this.birdImg.naturalWidth > 0) {
      ctx.drawImage(this.birdImg, -bird.width / 2, -bird.height / 2, bird.width, bird.height);
    } else {
      // Procedural Electric Volt Neo-Brutalist Bird
      const w = bird.width;
      const h = bird.height;

      // Body (Pure White Block with 3px Black Stroke)
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.strokeRect(-w / 2, -h / 2, w, h);

      // Beak (Angular block jutting right)
      ctx.fillStyle = '#000000';
      ctx.fillRect(w / 2 - 2, -4, 10, 8);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.strokeRect(w / 2 - 2, -4, 10, 8);

      // Eye (Sharp square pupil)
      ctx.fillStyle = '#000000';
      ctx.fillRect(w / 4 - 4, -h / 4 - 2, 6, 6);

      // Wing (Articulated rectangular flap)
      ctx.save();
      ctx.translate(-4, 0);
      ctx.rotate(bird.wingAngle);
      ctx.fillStyle = '#111111';
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.fillRect(-8, -4, 16, 8);
      ctx.strokeRect(-8, -4, 16, 8);
      ctx.restore();
    }

    ctx.restore();
  }
}
