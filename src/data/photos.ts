/**
 * Photos used on the site. The files in src/assets/photos are web-ready copies made from the
 * originals in assets/ by `npm run photos` (cropped, resized, EXIF removed).
 *
 * Add a photo: drop the original in assets/, add a line to scripts/prepare-photos.mjs,
 * run `npm run photos`, then import it here with its alt text and caption.
 */
import type { ImageMetadata } from 'astro';

import adaptiveLogo from '../assets/logos/adaptive-network.jpg';
import anjLogo from '../assets/logos/anj.jpg';
import bangkitLogo from '../assets/logos/bangkit.jpg';
import lktLogo from '../assets/logos/lkt.jpg';
import avatarImage from '../assets/photos/avatar.jpg';
import classImage from '../assets/photos/class-tt4402.jpg';
import defense1Image from '../assets/photos/defense-1.jpg';
import defense2Image from '../assets/photos/defense-2.jpg';
import profileImage from '../assets/photos/profile.jpg';
import researchLab1Image from '../assets/photos/research-lab-1.jpg';
import researchLab2Image from '../assets/photos/research-lab-2.jpg';
import researchTeam1Image from '../assets/photos/research-team-1.jpg';
import researchTeam2Image from '../assets/photos/research-team-2.jpg';
import wasteapp1Image from '../assets/photos/wasteapp-1.webp';
import wasteapp2Image from '../assets/photos/wasteapp-2.webp';
import wasteapp3Image from '../assets/photos/wasteapp-3.webp';
import wedding1Image from '../assets/photos/wedding-1.jpg';
import wedding2Image from '../assets/photos/wedding-2.jpg';
import wedding3Image from '../assets/photos/wedding-3.jpg';

export type Photo = {
  src: ImageMetadata;
  alt: string;
  /** Shown under the photo in the viewer. */
  caption: string;
};

export const avatar: Photo = {
  src: avatarImage,
  alt: 'Portrait of Faishal Yusuf Baqir',
  caption: 'Faishal Yusuf Baqir',
};

export const portrait: Photo = {
  src: profileImage,
  alt: 'Faishal Yusuf Baqir in a black suit with a wireless headset at an event venue',
  caption: 'Faishal Yusuf Baqir · Jakarta',
};

/** The first two are drawn on the page; the rest open in the viewer. */
export const researchPhotos: Photo[] = [
  {
    src: researchTeam1Image,
    alt: 'A dozen Adaptive Network Laboratory assistants in navy lab jackets, posed in three rows',
    caption: 'Adaptive Network Laboratory research assistants',
  },
  {
    src: researchLab1Image,
    alt: 'All Adaptive Network Laboratory assistants for 2023/2024 in one large group photo',
    caption: 'The whole lab · Adaptive Network 2023/2024',
  },
  {
    src: researchTeam2Image,
    alt: 'A second group photo of the Adaptive Network Laboratory assistants in navy lab jackets',
    caption: 'Research assistant team',
  },
  {
    src: researchLab2Image,
    alt: 'Adaptive Network Laboratory assistants cheering with their hands in the air',
    caption: 'Adaptive Network 2023/2024',
  },
];

export const classPhoto: Photo = {
  src: classImage,
  alt: 'Class TT-44-02 of Telecommunication Engineering in maroon blazers, posed in rows',
  caption: 'Class TT-44-02 · Telkom University, 2024',
};

export const defensePhotos: Photo[] = [
  {
    src: defense2Image,
    alt: 'Three students in maroon blazers and three lecturers giving thumbs up in front of a capstone presentation about a waste bank app',
    caption: 'Final capstone defense · Telkom University',
  },
  {
    src: defense1Image,
    alt: 'Three graduates in maroon blazers and sashes standing in front of a faculty building',
    caption: 'After the defense · 2024',
  },
];

export const weddingPhotos: Photo[] = [
  {
    src: wedding1Image,
    alt: 'The Terang Wedding Organizer crew in black suits and dresses posing with open arms',
    caption: 'The Terang Wedding Organizer crew',
  },
  {
    src: wedding2Image,
    alt: 'Three crew members in black masks coordinating at a wedding venue, one pointing',
    caption: 'Coordinating on the day',
  },
  {
    src: wedding3Image,
    alt: 'Crew in black and guests dancing together at a wedding reception',
    caption: 'Crew and guests at a reception',
  },
];

export const appScreens: Photo[] = [
  {
    src: wasteapp1Image,
    alt: 'WasteApp home screen with recycling articles and a donut chart of waste stock',
    caption: 'WasteApp · Home',
  },
  {
    src: wasteapp2Image,
    alt: 'WasteApp detection result with boxes around a water gallon, a plastic bottle and a plastic bag, each with a confidence score',
    caption: 'WasteApp · Detection result',
  },
  {
    src: wasteapp3Image,
    alt: 'WasteApp waste stock screen with a bar chart and a list of waste types in kilograms',
    caption: 'WasteApp · Waste stock',
  },
];

/** Galleries a case study can show, keyed by the `gallery` field in src/data/site.ts. */
export const galleries = {
  defense: {
    title: 'Defense day',
    intro: 'Presenting the capstone at Telkom University in 2024.',
    photos: defensePhotos,
  },
} as const;

/** Company logos for the experience timeline, keyed by the `logo` field in src/data/site.ts. */
export const logos = {
  lkt: lktLogo,
  anj: anjLogo,
  'adaptive-network': adaptiveLogo,
  bangkit: bangkitLogo,
} as const satisfies Record<string, ImageMetadata>;
