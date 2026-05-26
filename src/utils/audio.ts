// Web Audio API Synthesizer for MiniTAP
class AudioEngine {
  private ctx: AudioContext | null = null;

  constructor() {
    // Lazy initialize to bypass browser autoplay blocks
  }

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public playChannel(channel: string) {
    const ctx = this.init();
    const now = ctx.currentTime;

    switch (channel.toLowerCase()) {
      case 'a': // Flash - Deep Punchy Metronome/Kick
        this.playKick(ctx, now);
        break;
      case 's': // Spawn - Swirling Laser / Sci-Fi
        this.playSpawn(ctx, now);
        break;
      case 'd': // Fwd - Sharp High Pitch Metallic Sweep
        this.playFwd(ctx, now);
        break;
      case 'f': // Bwd - Falling Frequency Sweep
        this.playBwd(ctx, now);
        break;
      case 'h': // Pixel - High-pitched retro square wave pluck
        this.playPixel(ctx, now);
        break;
      case 'j': // PixelXL - Fat low sawtooth bass drop
        this.playPixelXL(ctx, now);
        break;
      case 'k': // Name / Clap - Melodic chime / Chord
        this.playName(ctx, now);
        break;
      case 'l': // Trails - High Pluck with Delay Echo
        this.playTrails(ctx, now);
        break;
      default:
        break;
    }
  }

  private playKick(ctx: AudioContext, time: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.15);

    gain.gain.setValueAtTime(1.0, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

    osc.start(time);
    osc.stop(time + 0.16);
  }

  private playSpawn(ctx: AudioContext, time: number) {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, time);
    osc.frequency.exponentialRampToValueAtTime(600, time + 0.35);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(100, time);
    filter.frequency.exponentialRampToValueAtTime(2000, time + 0.3);

    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

    osc.start(time);
    osc.stop(time + 0.36);
  }

  private playFwd(ctx: AudioContext, time: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, time);
    osc.frequency.exponentialRampToValueAtTime(1200, time + 0.12);

    gain.gain.setValueAtTime(0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    osc.start(time);
    osc.stop(time + 0.13);
  }

  private playBwd(ctx: AudioContext, time: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, time);
    osc.frequency.exponentialRampToValueAtTime(180, time + 0.22);

    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

    osc.start(time);
    osc.stop(time + 0.23);
  }

  private playPixel(ctx: AudioContext, time: number) {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.type = 'square';
    osc2.type = 'triangle';

    // Classic 8-bit double frequency
    osc1.frequency.setValueAtTime(523.25, time); // C5
    osc2.frequency.setValueAtTime(659.25, time); // E5

    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + 0.21);
    osc2.stop(time + 0.21);
  }

  private playPixelXL(ctx: AudioContext, time: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110.0, time); // A2 low
    osc.frequency.linearRampToValueAtTime(55.0, time + 0.4);

    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

    osc.start(time);
    osc.stop(time + 0.41);
  }

  private playName(ctx: AudioContext, time: number) {
    // Beautiful clean major chord chime
    const freqs = [329.63, 392.00, 523.25, 659.25]; // E4, G4, C5, E5 (C Major Chord)
    const oscillators = freqs.map(f => {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(f, time);
      return o;
    });

    const gain = ctx.createGain();
    oscillators.forEach(o => o.connect(gain));
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);

    oscillators.forEach(o => o.start(time));
    oscillators.forEach(o => o.stop(time + 0.61));
  }

  private playTrails(ctx: AudioContext, time: number) {
    // Play sound and then a couple of timed delay echoes
    const playEcho = (freq: number, vol: number, startTime: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(vol * 0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

      osc.start(startTime);
      osc.stop(startTime + 0.16);
    };

    // Primary hit
    playEcho(880, 1.0, time);
    // Delay 1
    playEcho(783.99, 0.6, time + 0.12);
    // Delay 2
    playEcho(698.46, 0.35, time + 0.24);
    // Delay 3
    playEcho(587.33, 0.18, time + 0.36);
  }
}

export const audioSynth = new AudioEngine();
