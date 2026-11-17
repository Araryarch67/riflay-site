export const PLAYER_PRESETS = [
  {
    id: "classic",
    name: "Classic",
    description:
      "The familiar Riflay player: a flower-shaped cover, classic playback controls and the volume slider close at hand.",
    details: ["Flower-shaped cover", "Classic controls", "Visible volume"],
  },
  {
    id: "stacked",
    name: "Stacked",
    description:
      "Let the artwork fill the player, with a large play pill, a bold seek bar and quick actions grouped below.",
    details: ["Cover background", "Pill transport", "Quick-action chips"],
  },
  {
    id: "liquid-stacked",
    name: "Liquid Stacked",
    description:
      "Stacked with glass controls over your artwork. On phones, Liquid glass navigation completes the look.",
    details: ["Cover background", "Glass controls", "Liquid glass tabs"],
  },
  {
    id: "kawaii",
    name: "Kawaii",
    description:
      "Artwork across the player, simple playback icons and a lighter set of controls. Volume is tucked into its own menu.",
    details: ["Cover background", "Plain transport", "Volume in menu"],
  },
  {
    id: "liquid-kawaii",
    name: "Liquid Kawaii",
    description:
      "Kawaii with glass around its utility buttons and Liquid glass navigation on phones, keeping playback controls plain.",
    details: ["Glass utility buttons", "Plain transport", "Liquid glass tabs"],
  },
] as const;
