/**
 * Every feature, as the Features table in Riflay's README lists it. "Where" uses the README's words:
 * "Computers" means Windows, macOS and Linux; "All" means every app.
 */
export type Feature = { name: string; what: string; where: string };
export type Area = { id: string; name: string; icon: string; features: Feature[] };

export const AREAS: Area[] = [
  {
    id: "library",
    name: "Library",
    icon: "library_music",
    features: [
      { name: "Local files and YouTube Music together", what: "One library and one playlist for both; no account needed, sign in only to sync.", where: "All" },
      { name: "Formats", what: "FLAC, ALAC, WavPack, APE, MP3, Ogg, Opus, WAV, AIFF, DSD (DSF / DSDIFF), SACD ISO and cue sheets.", where: "All" },
      { name: "Folder watching", what: "Songs added to or removed from your music folders show up on their own.", where: "All" },
      { name: "Smart playlists", what: "Most played, Recently added, Recently played, Lossless and more, kept up to date.", where: "All" },
      { name: "Duplicate finder", what: "Finds the same song in more than one file and keeps the best copy.", where: "All" },
      { name: "Tag editor", what: "Edits title, artist, album and cover; only the fields you change are written.", where: "All" },
      { name: "Import playlists", what: "From Spotify, Apple Music, Deezer, TIDAL or NetEase Cloud Music.", where: "All" },
      { name: "Spotify import", what: "Brings your playlists, Liked Songs and albums over.", where: "All" },
    ],
  },
  {
    id: "streaming",
    name: "Streaming",
    icon: "graphic_eq",
    features: [
      { name: "YouTube Music", what: "Search, home, radio, likes and your library, with Sign in with Google.", where: "All" },
      { name: "SoundCloud", what: "Search songs, artists and playlists; related tracks for autoplay. Off until you turn it on.", where: "All" },
      { name: "Monochrome", what: "Optional FLAC music search, downloads, track and collection links, and public playlist imports.", where: "All · downloads on native apps" },
      { name: "Smart merge", what: "Keeps YouTube Music's details and plays a matching lossless file or Monochrome stream; YouTube when there is none.", where: "Native apps" },
      { name: "SpotiFLAC extensions", what: "Install .sflx extensions; each provider becomes a Search filter with its own settings and downloads.", where: "Native apps" },
      { name: "Spotify playback", what: "Plays your Spotify playlists and albums from Spotify itself, with your own Premium account (experimental).", where: "Windows" },
      { name: "Music videos", what: "Watch a song's video in step with it, or use it as the Now Playing background.", where: "All" },
      { name: "Spotify Canvas", what: "The looping video Spotify shows with a song, in Video mode.", where: "All" },
    ],
  },
  {
    id: "downloads",
    name: "Downloads",
    icon: "download",
    features: [
      { name: "Download songs", what: "Choose the format, quality and folder.", where: "All" },
      { name: "Download source", what: "Download a YouTube Music song from another source: pick the provider, then the matching recording.", where: "Native apps" },
      { name: "Download with MV", what: "Keeps the song's music video beside it, to watch offline.", where: "All" },
    ],
  },
  {
    id: "hifi",
    name: "Hi-fi output",
    icon: "speaker",
    features: [
      { name: "Bit-perfect mode", what: "Sends the file to the DAC untouched, no mixing or resampling.", where: "Computers · Android 14+ with a USB DAC" },
      { name: "Exclusive mode", what: "Takes over the device so the system mixer can't resample.", where: "Windows, macOS" },
      { name: "ASIO", what: "Low-latency output to pro audio interfaces.", where: "Windows" },
      { name: "Native DSD (DoP)", what: "DSD goes to your DAC as it is.", where: "Computers · Android 14+ with a USB DAC" },
      { name: "USB DAC / Direct USB", what: "Plays to a USB DAC directly, on any phone.", where: "Android" },
      { name: "Signal path", what: "Shows every stage from the file to the speaker.", where: "All" },
    ],
  },
  {
    id: "sound",
    name: "Sound effects",
    icon: "equalizer",
    features: [
      { name: "Equalizer", what: "Bands and presets of your own.", where: "All" },
      { name: "AutoEQ", what: "Sets the equalizer for your headphones or IEM from their measurement.", where: "All" },
      { name: "Volume leveling", what: "Keeps songs at the same loudness.", where: "All" },
      { name: "Virtual speakers (HRTF)", what: "Speakers in a room on headphones, up to a 7.1 room.", where: "All" },
      { name: "Crossfeed", what: "Makes headphones sound more like speakers.", where: "All" },
      { name: "Room correction", what: "Loads an impulse response, for example from REW.", where: "All" },
      { name: "Audio plugins", what: "VST, LV2 and CLAP plugins through Carla.", where: "Computers" },
      { name: "Mono audio, Skip silence", what: "Both channels in one; silent intros, outros and gaps cut short.", where: "All" },
    ],
  },
  {
    id: "playback",
    name: "Playback",
    icon: "play_circle",
    features: [
      { name: "Autoplay, gapless, crossfade", what: "Keeps the music going, with or without gaps.", where: "All" },
      { name: "Sleep timer", what: "The music fades out, then stops.", where: "All" },
      { name: "Casting", what: "To TVs, speakers and receivers with DLNA or AirPlay.", where: "Computers, phones" },
      { name: "Listen together", what: "Friends play along in sync over Wi-Fi or the internet, with room chat, encrypted internet rooms and QR joining.", where: "All" },
    ],
  },
  {
    id: "lyrics",
    name: "Lyrics",
    icon: "lyrics",
    features: [
      { name: "Synced lyrics", what: "Follow every word, from LRCLIB, Better Lyrics, Kugou, NetEase, Musixmatch, QQ, Megalobiz, Genius and lyrics.ovh.", where: "All" },
      { name: "Pronunciation and translation", what: "Read along in lyrics you can't read.", where: "All" },
      { name: "Your own lyrics", what: "Use an .lrc file or the song's embedded lyrics, or edit them.", where: "All" },
      { name: "Lyric cards", what: "Pick lines and share them as a picture.", where: "All" },
    ],
  },
  {
    id: "nowplaying",
    name: "Now Playing",
    icon: "tune",
    features: [
      { name: "Build your own player", what: "Pick the cover, top, buttons, progress bar, controls and bottom row one by one.", where: "All" },
      { name: "Presets", what: "Classic, Stacked, Liquid Stacked, Kawaii and Liquid Kawaii.", where: "All" },
      { name: "Liquid glass", what: "Glass controls, and a glass tab bar on phones that shrinks as you scroll.", where: "All" },
      { name: "Visualizer", what: "Bars, dots, line, mirror, orbit, peaks, petals, pulse, twin waves and wave.", where: "All" },
      { name: "Backgrounds", what: "Plain colour, blurred cover, the music video, or black.", where: "All" },
      { name: "Full screen", what: "A full-screen player with lyrics.", where: "All" },
    ],
  },
  {
    id: "look",
    name: "Look & feel",
    icon: "palette",
    features: [
      { name: "Themes", what: "Dynamic (from the song's cover), Monochrome, Catppuccin, Everforest, Everblush, Nord, Gruvbox, Tokyo Night, Dracula, Rosé Pine, Custom and Matugen; dark, light or the system's.", where: "All" },
      { name: "Material 3 pages", what: "Search, Settings and the extension pages follow Material 3, in your theme's colours.", where: "All" },
      { name: "Layout", what: "Phone tab bar styles, desktop bar styles, corners, density, cover size and motion.", where: "All" },
      { name: "Language and text", what: "English, Indonesian and Japanese; text size and any font on your device.", where: "All" },
    ],
  },
  {
    id: "stats",
    name: "Stats",
    icon: "insights",
    features: [
      { name: "Listening stats", what: "Top songs, artists and albums, kept on your device.", where: "All" },
      { name: "Riflay Wrap", what: "Your month in music, ready to share.", where: "All" },
      { name: "Last.fm and ListenBrainz", what: "Adds the songs you play to your profile there, even offline.", where: "All" },
      { name: "Discord", what: "Shows what you play on your Discord profile.", where: "Computers" },
    ],
  },
  {
    id: "device",
    name: "Your device",
    icon: "devices",
    features: [
      { name: "Performance modes", what: "Lightweight, Balanced and Heavy.", where: "All" },
      { name: "Media controls", what: "Notification, Control Center and MPRIS.", where: "All" },
      { name: "Mini player and island", what: "A small window on top, or an island at the top of the screen, floating or docked.", where: "Computers" },
      { name: "Tray icon", what: "Close to the tray and control Riflay from its menu.", where: "Computers" },
      { name: "Backup and restore", what: "Your settings, playlists and history in one file.", where: "All" },
      { name: "Settings search", what: "Find any setting by name, with a live preview that stays in view while you change it.", where: "All" },
      { name: "Riflay CLI", what: "Control the desktop player from a terminal or an AI agent, with JSON output.", where: "Computers" },
      { name: "Riflay Web", what: "YouTube Music in a browser, through its own proxy.", where: "Web" },
    ],
  },
];

export const FEATURE_COUNT = AREAS.reduce((n, a) => n + a.features.length, 0);
