export type ProjectCategory = "Residential" | "Hospitality" | "Styling";

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  width: number;
  height: number;
  aspect: "landscape" | "portrait" | "square";
}

export interface MaterialItem {
  name: string;
  finish: string;
  application: string;
}

export interface ProjectStudy {
  slug: string;
  title: string;
  category: ProjectCategory;
  conceptLabel: string;
  setting: string;
  areaContext: string;
  shortDescription: string;
  featured: boolean;
  featuredScale: "wide" | "tall" | "offset";
  heroImage: ProjectImage;
  brief: string[];
  designApproach: string[];
  daylightAndLayout: string;
  materialPalette: MaterialItem[];
  proposedScope: string[];
  gallery: ProjectImage[];
}

export const PROJECTS: ProjectStudy[] = [
  {
    slug: "arid-courtyard-residence",
    title: "Arid Courtyard Residence",
    category: "Residential",
    conceptLabel: "Project 01 — Residential Architecture & Interiors",
    setting: "High Desert Foothills",
    areaContext: "240 sq m single-level courtyard residence",
    shortDescription:
      "A single-level residence organized around a limestone courtyard, using oiled white oak beams, lime-washed plaster, and low linen seating to temper bright desert sun.",
    featured: true,
    featuredScale: "wide",
    heroImage: {
      src: "/assets/dune-hero-courtyard.jpg",
      alt: "Sunlit living room with oiled oak ceiling beams, low linen sofa, travertine coffee table, and open steel-framed doors to a stone courtyard",
      caption:
        "Primary living room looking toward the sheltered limestone courtyard. Deep timber overhangs soften midday glare.",
      credit: "Dune & Oak — Residential Architecture & Interiors",
      width: 1376,
      height: 768,
      aspect: "landscape",
    },
    brief: [
      "Arid Courtyard Residence explores how an open-plan desert home can feel sheltered and intimate rather than over-exposed to glare. The brief centers on a calm transition from bright exterior sun into cool, absorptive interior rooms.",
      "Instead of relying on tall glazing across every elevation, the plan orientates principal living and dining spaces inward toward a planted limestone courtyard, allowing cross-ventilation and filtered reflected light throughout the day.",
    ],
    designApproach: [
      "We established a low horizontal datum across the main living room: exposed wire-brushed white oak ceiling joists draw the eye toward the garden threshold, while a custom low-slung oak platform sofa keeps sightlines open across the room.",
      "Walls are finished in hand-troweled sand lime plaster that absorbs sharp daylight without chalkiness. Underfoot, wide-plank European oak boards and a tightly woven jute rug ground the seating arrangement around a honed travertine plinth table.",
    ],
    daylightAndLayout:
      "East-to-west courtyard orientation with deep timber pergola louvers outside the main steel-framed sliders. Morning light washes the kitchen plaster walls; late afternoon light grazes the oak ceiling beams.",
    materialPalette: [
      {
        name: "Wire-Brushed White Oak",
        finish: "Dead-flat hardwax oil",
        application: "Ceiling joists, wide-plank flooring, and low platform sofa frame",
      },
      {
        name: "Natural Lime Plaster",
        finish: "Fine mineral aggregate in warm sand",
        application: "Interior perimeter walls and fireplace hearth surround",
      },
      {
        name: "Unfilled Roman Travertine",
        finish: "Honed, eased edges",
        application: "Central low coffee table and exterior courtyard paving",
      },
      {
        name: "Heavyweight Belgian Linen",
        finish: "Undyed oat weave",
        application: "Removable upholstery cushions and full-height window drapery",
      },
    ],
    proposedScope: [
      "Spatial reconfiguration and interior architectural thresholds",
      "Flooring, wall plaster, and ceiling timber specification",
      "Bespoke living room joinery and low platform seating design",
      "Indoor-outdoor furniture curation and courtyard material continuity",
    ],
    gallery: [
      {
        src: "/assets/dune-hero-courtyard.jpg",
        alt: "Courtyard living room with oak beams and travertine table",
        caption: "Living room threshold opening onto the planted limestone terrace.",
        credit: "Dune & Oak — Residential Interiors",
        width: 1376,
        height: 768,
        aspect: "landscape",
      },
      {
        src: "/assets/dune-dining-oak.jpg",
        alt: "Solid white oak dining table with sculpted wooden chairs and linen curtains",
        caption: "Adjacent dining room with full-height linen drapery filtering courtyard light.",
        credit: "Dune & Oak — Residential Interiors",
        width: 1376,
        height: 768,
        aspect: "landscape",
      },
      {
        src: "/assets/dune-material-study.jpg",
        alt: "Tactile palette of white oak, porous travertine, raw linen, and sand ceramic bowl",
        caption: "Material palette pairing porous travertine, solid oak, and raw linen.",
        credit: "Dune & Oak Material Library",
        width: 896,
        height: 1200,
        aspect: "portrait",
      },
    ],
  },
  {
    slug: "mesquite-house-guest-lounge",
    title: "Mesquite House Guest Lounge",
    category: "Hospitality",
    conceptLabel: "Project 02 — Boutique Hospitality",
    setting: "Sonoran Desert Retreat",
    areaContext: "110 sq m arrival pavilion, lounge, and reading library",
    shortDescription:
      "An arrival lounge and quiet library for a twelve-key desert guesthouse, replacing conventional hotel reception desks with a monolithic travertine plinth and built-in oak seating.",
    featured: true,
    featuredScale: "tall",
    heroImage: {
      src: "/assets/dune-hospitality-lounge.jpg",
      alt: "Boutique guesthouse lounge with rammed earth walls, olive wool bench cushions, travertine reception plinth, and oak joinery",
      caption:
        "Arrival pavilion with monolithic travertine check-in plinth, rammed-earth texture, and built-in oak bench seating upholstered in muted olive wool.",
      credit: "Dune & Oak — Boutique Hospitality",
      width: 1200,
      height: 896,
      aspect: "landscape",
    },
    brief: [
      "Mesquite House was designed for a small-scale desert guesthouse where arrival feels like entering a private collector's residence rather than a commercial lobby. The spatial brief eliminates queue barriers, digital signage, and high-gloss surfaces.",
      "Guests step from a shaded courtyard directly into a cool, earthen room where check-in happens informally alongside a library of regional architecture and botanical monographs.",
    ],
    designApproach: [
      "The architectural shell pairs compacted earth and sand plaster walls with floor-to-ceiling white oak shelving that conceals luggage storage and back-of-house functions. A curved honed travertine island anchors the center of the room without dividing circulation.",
      "Seating is arranged in two distinct zones: a deep built-in masonry and oak banquette dressed in muted olive wool cushions for shaded reading, and low saddle-leather timber armchairs oriented toward the courtyard olive trees.",
    ],
    daylightAndLayout:
      "Indirect north-facing clerestory and deeply recessed courtyard loggia prevent harsh contrast, keeping the arrival room naturally cool and dim during peak afternoon heat.",
    materialPalette: [
      {
        name: "Compacted Earth & Lime Render",
        finish: "Raw stratified texture",
        application: "Feature structural wall and recessed window reveals",
      },
      {
        name: "Quarter-Sawn White Oak",
        finish: "Matte soap finish",
        application: "Full-height storage cabinetry, library shelving, and low tea table",
      },
      {
        name: "Vein-Cut Travertine",
        finish: "Honed monolithic block with radiused corner",
        application: "Central host plinth and check-in counter",
      },
      {
        name: "Melange Olive Wool & Saddle Leather",
        finish: "Natural vegetable-tanned and woven textiles",
        application: "Built-in banquette cushions and low lounge chairs",
      },
    ],
    proposedScope: [
      "Guest arrival sequence and public-area spatial planning",
      "Custom reception plinth and architectural storage millwork",
      "Hospitality-grade natural upholstery and acoustic surface specification",
      "Ceramic vessel curation and ambient task lighting layout",
    ],
    gallery: [
      {
        src: "/assets/dune-hospitality-lounge.jpg",
        alt: "Hospitality lounge with travertine desk and olive banquette",
        caption: "Main arrival room looking past the travertine plinth toward the shaded courtyard.",
        credit: "Dune & Oak — Boutique Hospitality",
        width: 1200,
        height: 896,
        aspect: "landscape",
      },
      {
        src: "/assets/image3.jpg",
        alt: "Low timber platform sofa against dark foliage and charcoal plaster wall",
        caption: "Evening garden loggia seating with solid timber joinery and linen bolsters.",
        credit: "Dune & Oak — Hospitality Detail",
        width: 1080,
        height: 1320,
        aspect: "portrait",
      },
      {
        src: "/assets/decor-image-2.jpeg",
        alt: "Warm glass lantern resting on a timber library ladder beside books",
        caption: "Evening library lighting: portable warm filament glass lantern for low-glare reading.",
        credit: "Dune & Oak — Lighting Detail",
        width: 800,
        height: 1000,
        aspect: "portrait",
      },
    ],
  },
  {
    slug: "limestone-kitchen-and-larder",
    title: "Limestone Kitchen & Walk-In Larder",
    category: "Residential",
    conceptLabel: "Project 03 — Culinary & Joinery Architecture",
    setting: "Coastal Canyon Residence",
    areaContext: "48 sq m kitchen, prep island, and dry pantry",
    shortDescription:
      "A quiet working kitchen conceived as furniture rather than fitted machinery, featuring quarter-sawn oak cabinetry, integrated limestone sinks, and an open walk-in dry larder.",
    featured: true,
    featuredScale: "offset",
    heroImage: {
      src: "/assets/dune-residential-kitchen.jpg",
      alt: "Minimalist oak and limestone kitchen with open shelf ceramics and walk-in pantry",
      caption:
        "Primary sink run in quarter-sawn white oak with carved timber pulls, honed limestone apron sink, and full-height walk-in larder threshold.",
      credit: "Dune & Oak — Kitchen & Joinery Architecture",
      width: 1200,
      height: 896,
      aspect: "landscape",
    },
    brief: [
      "This residence rethinks the domestic kitchen for households that cook daily and prefer honest, tactile surfaces over lacquered cabinetry and overhead wall cupboards. By moving bulk dry storage and small appliances into an adjacent walk-in larder, the main cooking room remains calm and uncluttered.",
      "A single floating oak ledger shelf holds everyday stoneware pitchers and bowls within easy reach while leaving the hand-troweled plaster wall open to morning side-light.",
    ],
    designApproach: [
      "Cabinet fronts are detailed in vertical-grain white oak with integrated solid-timber finger pulls, eliminating applied metal hardware that snags clothing. Countertops and the deep apron-front sink are fabricated from 40mm honed beige limestone with a short upstand.",
      "The walk-in larder repeats the same oak shelving and limestone worktop at a narrower depth, allowing glass jars, linen bread bags, and woven baskets to remain visible and organized at eye level.",
    ],
    daylightAndLayout:
      "Full-height casement doors to the left of the sink bring directional morning light across the limestone counter, while the walk-in pantry stays cool and shaded on the interior wall.",
    materialPalette: [
      {
        name: "Quarter-Sawn European Oak",
        finish: "Clear matte waterborne lacquer for moisture resistance",
        application: "Base cabinetry, integrated drawer pulls, island cladding, and larder shelving",
      },
      {
        name: "Honed Jura Beige Limestone",
        finish: "Matte sealed stone with eased 2mm arris",
        application: "Worktops, integrated sink basin, and 100mm splashback upstand",
      },
      {
        name: "Brushed Raw Brass",
        finish: "Unlacquered living finish",
        application: "Gooseneck mixer tap and single wall utility hook",
      },
      {
        name: "Hand-Thrown Stoneware & Raw Linen",
        finish: "Unglazed clay base and washed flax",
        application: "Open shelf vessels, pantry storage sacks, and hand towels",
      },
    ],
    proposedScope: [
      "Kitchen and walk-in larder spatial planning and workflow ergonomics",
      "Full bespoke joinery drawings and stone fabrication details",
      "Appliance integration and concealed extraction detailing",
      "Tableware, counter stool, and culinary textile styling",
    ],
    gallery: [
      {
        src: "/assets/dune-residential-kitchen.jpg",
        alt: "Oak kitchen cabinetry with limestone sink and walk-in pantry",
        caption: "Elevation view of the oak sink run and open walk-in dry larder.",
        credit: "Dune & Oak — Residential Interiors",
        width: 1200,
        height: 896,
        aspect: "landscape",
      },
      {
        src: "/assets/dune-dining-oak.jpg",
        alt: "Solid oak dining table adjacent to tall garden windows",
        caption: "The adjoining dining room shares the same lime plaster and solid oak vocabulary.",
        credit: "Dune & Oak — Residential Interiors",
        width: 1376,
        height: 768,
        aspect: "landscape",
      },
      {
        src: "/assets/dune-material-study.jpg",
        alt: "Oak, travertine, linen, and stoneware material palette on workbench",
        caption: "Material pairing balancing timber grain tone against limestone and stoneware glazes.",
        credit: "Dune & Oak Material Library",
        width: 896,
        height: 1200,
        aspect: "portrait",
      },
    ],
  },
  {
    slug: "linen-and-oak-daybed-study",
    title: "Linen & Oak Daybed Dressing Room",
    category: "Styling",
    conceptLabel: "Project 04 — Furniture Curation & Styling",
    setting: "Townhouse Primary Suite",
    areaContext: "36 sq m bedroom alcove and reading room",
    shortDescription:
      "A furniture and textile composition pairing a low solid-oak and olive-leather daybed with heavy charcoal-flax drapery, parquetry flooring, and sculptural timber seating.",
    featured: false,
    featuredScale: "tall",
    heroImage: {
      src: "/assets/image-4.jpeg",
      alt: "Low solid oak daybed with olive leather mattress in front of floor-to-ceiling linen drapery and herringbone oak floor",
      caption:
        "A low oak daybed upholstered in muted olive leather bridges the threshold between French casement windows and heavy acoustic linen drapery.",
      credit: "Dune & Oak — Furniture & Textile Styling",
      width: 800,
      height: 1000,
      aspect: "portrait",
    },
    brief: [
      "Often an existing architectural room has generous proportions and strong daylight, yet feels acoustically hollow or visually fragmented due to underscaled furniture. Here, three decisive pieces anchor a tall townhouse room without structural renovation.",
      "Rather than filling corners with small accent tables, the composition centers on a long horizontal daybed, full-height drapery, and a single sculptural timber lounge chair.",
    ],
    designApproach: [
      "Floor-to-ceiling heavy linen drapery in deep slate-charcoal softens the room's acoustic reverberation and provides a vertical counterpoint to the warm herringbone oak parquet.",
      "In the foreground, a low tapered-leg oak daybed with a stitched olive-green leather cushion introduces a calm resting place that does not block daylight from the tall French windows. A companion cognac-leather and turned-oak lounge chair completes the reading corner.",
    ],
    daylightAndLayout:
      "Side-lit by tall east-facing French doors; a flat-weave ivory wool rug bounces morning light upward into the room.",
    materialPalette: [
      {
        name: "Solid Soap-Treated Oak",
        finish: "Turned and tapered joinery",
        application: "Daybed frame and lounge chair structure",
      },
      {
        name: "Aniline Olive & Cognac Leather",
        finish: "Full-grain matte hide",
        application: "Daybed mattress cushion, head bolster, and armchair upholstery",
      },
      {
        name: "Heavyweight Belgian Flax",
        finish: "Charcoal yarn-dyed weave",
        application: "Full-height wave-pleat acoustic curtain wall",
      },
      {
        name: "Hand-Loomed Wool Flatweave",
        finish: "Unbleached chalk ivory",
        application: "Oversized area rug defining the resting zone",
      },
    ],
    proposedScope: [
      "Furniture layout, scale validation, and floor plan placement",
      "Bespoke drapery specification, track hardware, and acoustic lining",
      "Loose furniture procurement (daybed, lounge seating, rugs, lighting)",
      "On-site placement and final textile dressing",
    ],
    gallery: [
      {
        src: "/assets/image-4.jpeg",
        alt: "Oak daybed with olive cushion before charcoal linen curtains",
        caption: "Primary daybed vignette balancing olive leather, oak legs, and ivory wool flatweave.",
        credit: "Dune & Oak — Furniture Styling",
        width: 800,
        height: 1000,
        aspect: "portrait",
      },
      {
        src: "/assets/image-1.jpeg",
        alt: "Turned oak lounge chair with cognac leather upholstery against muted sage wall",
        caption: "Companion reading chair: turned solid oak frame with cognac saddle leather.",
        credit: "Dune & Oak — Furniture Styling",
        width: 800,
        height: 1000,
        aspect: "portrait",
      },
      {
        src: "/assets/decor-image-1.jpeg",
        alt: "Warm translucent table lamp beside a speckled stoneware planter on an oak bedside surface",
        caption: "Bedside lighting vignette pairing diffused glass illumination with speckled stoneware.",
        credit: "Dune & Oak — Object Styling",
        width: 800,
        height: 1000,
        aspect: "portrait",
      },
    ],
  },
  {
    slug: "slatted-oak-tea-sanctuary",
    title: "Slatted Oak Tea Sanctuary",
    category: "Hospitality",
    conceptLabel: "Project 05 — Boutique Wellness & Tea Room",
    setting: "Urban Courtyard Sanctuary",
    areaContext: "65 sq m quiet tea lounge and reading alcove",
    shortDescription:
      "An intimate tea room and reading sanctuary where vertical oak louver screens, curved built-in timber benches, and textured plaster alcoves filter street noise into stillness.",
    featured: false,
    featuredScale: "wide",
    heroImage: {
      src: "/assets/dune-tea-sanctuary.jpg",
      alt: "Intimate tea room with curved oak bench, olive linen cushions, slatted timber screen, and ceramic tea vessels on a travertine table",
      caption:
        "Vertical white oak louvers filter garden daylight while a continuous curved oak bench and travertine table anchor the room.",
      credit: "Dune & Oak — Boutique Hospitality",
      width: 896,
      height: 1200,
      aspect: "portrait",
    },
    brief: [
      "Created for an independent tea house and bathhouse reading room, this project addresses how a compact urban ground floor can offer visual privacy without feeling closed off from daylight.",
      "The room is proportioned for unhurried ninety-minute sittings—requiring comfortable bench angles, warm low-level lighting, and surfaces that welcome hot ceramic vessels.",
    ],
    designApproach: [
      "A full-height screen of vertical white oak fins separates the window bay from the seating alcove, breaking direct sun into rhythmic shadow lines across the wide-plank timber floor.",
      "Along the lime-plastered perimeter wall, a continuous cantilevered oak bench curves gently into the corner, topped with loose olive-flax cushions. Recessed plaster niches display hand-thrown stoneware teapots and reference books without protruding shelving.",
    ],
    daylightAndLayout:
      "Filtered south-west window light passes through 45mm oak louvers, supplemented by warm 2400K wall task lamps in the reading niches.",
    materialPalette: [
      {
        name: "Solid White Oak Louvers & Joinery",
        finish: "Natural matte oil",
        application: "Full-height privacy screen, curved perimeter bench, and niche shelves",
      },
      {
        name: "Honed Travertine Slab",
        finish: "Open-pore natural stone",
        application: "Low tea table on twin stone pedestals",
      },
      {
        name: "Earth-Toned Linen & Wool",
        finish: "Washed olive and oatmeal weave",
        application: "Loose back cushions, bench pads, and woven table runner",
      },
      {
        name: "Aged Distressed Timber Flooring",
        finish: "Reclaimed wide-plank boards",
        application: "Acoustic and tactile floor surface throughout the lounge",
      },
    ],
    proposedScope: [
      "Interior spatial partitioning and timber screen architecture",
      "Custom curved banquette joinery and plaster niche detailing",
      "Low-glare hospitality lighting and acoustic textile specification",
      "Artisanal ceramic vessel and tea service styling",
    ],
    gallery: [
      {
        src: "/assets/dune-tea-sanctuary.jpg",
        alt: "Slatted oak tea sanctuary with travertine low table and ceramic tea set",
        caption: "Corner banquette and slatted oak screen in afternoon light.",
        credit: "Dune & Oak — Boutique Hospitality",
        width: 896,
        height: 1200,
        aspect: "portrait",
      },
      {
        src: "/assets/decor-image-6.jpeg",
        alt: "Sculptural handmade paper-shade table lamp on a cylindrical cream base",
        caption: "Tactile lighting detail: handmade textured paper shade casting warm downward light.",
        credit: "Dune & Oak — Lighting Detail",
        width: 800,
        height: 1000,
        aspect: "portrait",
      },
      {
        src: "/assets/office-image-2.jpeg",
        alt: "Pitted dark volcanic basalt tray with brushed brass sculptural blocks",
        caption: "Material contrast: raw porous volcanic stone paired with brushed solid brass.",
        credit: "Dune & Oak — Material Detail",
        width: 800,
        height: 1000,
        aspect: "portrait",
      },
    ],
  },
  {
    slug: "cantilevered-oak-study-alcove",
    title: "Cantilevered Oak Study Alcove",
    category: "Styling",
    conceptLabel: "Project 06 — Domestic Workspace & Object Styling",
    setting: "Classical Apartment Interior",
    areaContext: "18 sq m domestic writing niche and reading corner",
    shortDescription:
      "A compact domestic workspace integrated seamlessly into a living room niche using a cantilevered solid oak desk shelf, sculptural ash seating, and warm task lighting.",
    featured: false,
    featuredScale: "offset",
    heroImage: {
      src: "/assets/office-image-1.jpeg",
      alt: "Cantilevered solid oak wall desk with upholstered timber chair, wool throw, and framed print against warm ivory wall",
      caption:
        "A wall-mounted solid oak writing shelf keeps the parquet floor completely clear, paired with an upholstered oak chair and woven linen throw.",
      credit: "Dune & Oak — Workspace & Object Styling",
      width: 800,
      height: 1000,
      aspect: "portrait",
    },
    brief: [
      "Working from home frequently introduces visual clutter—heavy metal desk legs, tangled cables, and task chairs that clash with residential living rooms. For this apartment, a dedicated writing and laptop station occupies a 1.2-meter wall niche with quiet domestic dignity.",
      "Every element is selected for tactile warmth so that when work finishes at dusk, the corner reads as an intentional piece of domestic furniture.",
    ],
    designApproach: [
      "A chamfered solid oak shelf cantilevers directly from the plastered wall, incorporating a subtle rear timber ledge that conceals charging cables and holds a framed botanical print and water carafe.",
      "Seating is provided by a sculpted solid-oak side chair upholstered in pebble-grey wool bouclé, draped with a fringed oatmeal linen throw. Task lighting uses a turned wooden arm lamp and a cylindrical frosted-glass desk light for glare-free evening focus.",
    ],
    daylightAndLayout:
      "Positioned perpendicular to a tall casement window so natural side-light illuminates the desk surface without screen reflections.",
    materialPalette: [
      {
        name: "Chamfered Solid European Oak",
        finish: "Natural matte oil",
        application: "Cantilevered wall desk, rear cable ledge, and chair frame",
      },
      {
        name: "Pebble Wool & Undyed Flax",
        finish: "Textured upholstery weave and hand-fringed throw",
        application: "Desk chair seat pad and tactile textile layering",
      },
      {
        name: "Steam-Bent Ash & Frosted Glass",
        finish: "Warm diffused LED and natural timber",
        application: "Architectural desk lamps for evening task illumination",
      },
    ],
    proposedScope: [
      "Compact workspace ergonomics and wall-mount joinery detailing",
      "Sculptural timber seating and task lighting selection",
      "Cable concealment and desktop object curation",
    ],
    gallery: [
      {
        src: "/assets/office-image-1.jpeg",
        alt: "Cantilevered oak wall desk with timber chair and wool throw",
        caption: "Primary writing niche with cantilevered oak shelf and herringbone parquet.",
        credit: "Dune & Oak — Workspace Styling",
        width: 800,
        height: 1000,
        aspect: "portrait",
      },
      {
        src: "/assets/office-image-3.jpeg",
        alt: "Pair of sculpted pale ash armchairs with muted stone seat pads on painted timber floorboards",
        caption: "Sculptural timber joinery: organic ash frames with low-profile upholstered pads.",
        credit: "Dune & Oak — Furniture Curation",
        width: 800,
        height: 1000,
        aspect: "portrait",
      },
      {
        src: "/assets/decor-image-5.jpeg",
        alt: "Steam-bent pale wood desk lamp with circular LED head and ceramic base tray",
        caption: "Task lighting pairing a steam-bent timber arm with an integrated stone base dish.",
        credit: "Dune & Oak — Lighting Selection",
        width: 800,
        height: 1000,
        aspect: "portrait",
      },
      {
        src: "/assets/office-image-4.jpeg",
        alt: "Frosted glass cylinder desk lamp resting on a pale timber worktable",
        caption: "Diffused glass cylinder lamp casting soft directional light across timber grain.",
        credit: "Dune & Oak — Lighting Selection",
        width: 800,
        height: 1000,
        aspect: "portrait",
      },
    ],
  },
];

export interface ServiceOffering {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  suitableProjects: string[];
  deliverables: string[];
  howScopeIsAgreed: string;
}

export const SERVICES: ServiceOffering[] = [
  {
    id: "interior-design",
    number: "01",
    title: "Interior Design",
    subtitle: "Spatial planning, architectural surfaces, and bespoke joinery",
    summary:
      "Comprehensive interior architecture for new residential builds, full-home renovations, and single-floor spatial reconfigurations. We focus on circulation, daylight orientation, acoustic calm, and built-in timber and stone elements that anchor the architecture.",
    suitableProjects: [
      "Private residences undergoing layout reconfiguration or architectural renovation",
      "New-build homes requiring early interior spatial review alongside project architects",
      "Kitchen, bath, library, and walk-in larder joinery commissions",
    ],
    deliverables: [
      "Measured spatial layouts, circulation plans, and furniture arrangements",
      "Material, stone, plaster, and timber finish schedules with maintenance guidance",
      "Custom joinery and millwork elevation drawings for cabinetmakers",
      "Architectural lighting layouts and switching schedules",
      "Sanitaryware, hardware, and surface finish schedules for contractor tender",
    ],
    howScopeIsAgreed:
      "Following an initial review of your floor plans, site photographs, and project brief, we outline a staged scope covering Spatial Direction, Design Development, and Technical Documentation. Fees are agreed as a transparent stage-by-stage proposal matched to the floor area and joinery complexity required—never as arbitrary pre-packaged tiers.",
  },
  {
    id: "furniture-selection-and-styling",
    number: "02",
    title: "Furniture Selection & Styling",
    subtitle: "Loose furniture curation, bespoke upholstery, drapery, and objects",
    summary:
      "For architecturally complete rooms that need warmth, scale discipline, and tactile coherence. We source and commission enduring timber pieces, natural-fiber upholstery, acoustic linen drapery, hand-loomed rugs, and quiet lighting.",
    suitableProjects: [
      "Newly completed residences that feel acoustically hard or visually sparse",
      "Primary living, dining, and bedroom suites needing cohesive furniture scale",
      "Focused single-room libraries, reading alcoves, and dressing rooms",
    ],
    deliverables: [
      "Scaled furniture placement plans verifying sightlines and walkways",
      "Itemized furniture, rug, luminaire, and textile specifications with trade sourcing",
      "Custom drapery, window treatment, and upholstery fabric curation",
      "Ceramics, stoneware, and tactile object selection for shelving and tables",
      "On-site placement and final dressing coordination once pieces arrive",
    ],
    howScopeIsAgreed:
      "We begin with a room-by-room inventory determining which existing pieces will remain and where new investments are needed. Scope and procurement responsibilities are agreed in writing before sourcing begins, with clear separation between studio design time and direct furniture purchasing.",
  },
  {
    id: "boutique-hospitality",
    number: "03",
    title: "Boutique Hospitality & Small Commercial Spaces",
    subtitle: "Guesthouses, tea rooms, tasting lounges, and calm workspaces",
    summary:
      "Interior direction for independent hospitality and intimate commercial spaces that reject loud branding in favor of domestic warmth, durable natural materials, and unhurried guest rituals.",
    suitableProjects: [
      "Small guesthouses, desert or coastal retreats, and arrival lounges",
      "Tea rooms, ceramic or retail ateliers, and quiet tasting spaces",
      "Calm studio workspaces and private client reading rooms",
    ],
    deliverables: [
      "Guest arrival sequence, seating density, and acoustic zoning plans",
      "Bespoke host plinths, banquette seating, and storage millwork packages",
      "High-durability natural material specifications (honed stone, solid timber, wool)",
      "Warm low-glare ambient and task lighting direction for day-to-dusk transitions",
      "Loose furniture, tableware, and vessel styling briefs",
    ],
    howScopeIsAgreed:
      "Commercial and hospitality scopes are structured around your operational brief, seating capacity, and contractor schedule. After reviewing site constraints and commercial goals, we issue a tailored scope matrix defining studio deliverables alongside your local architect or build team.",
  },
];

export const STUDIO_PRINCIPLES = [
  {
    number: "01",
    title: "Layout & Thresholds",
    body: "A room succeeds or fails in plan before a single material finish is selected. We study how you enter a space, where coats and bags rest, how sightlines terminate at windows or quiet plaster walls, and how furniture groupings encourage conversation without blocking natural pathways.",
  },
  {
    number: "02",
    title: "Daylight & Shadow",
    body: "Rather than flooding every square meter with uniform overhead illumination, we design for directional daylight and gentle shadow. Deep window reveals, slatted oak screens, and unbleached linen drapery soften midday glare, while low-level 2400K–2700K lamps bring intimacy after dusk.",
  },
  {
    number: "03",
    title: "Honest Material Aging",
    body: "We favor materials that gain character through daily contact rather than synthetic surfaces engineered to look frozen in time. Oiled white oak, unfilled travertine, hand-troweled lime plaster, saddle leather, and raw flax develop a quiet patina that reflects the life of the household.",
  },
  {
    number: "04",
    title: "Everyday Use & Maintenance",
    body: "Calm interiors should not require fragile tiptoeing. We specify removable linen slipcovers, repairable hardwax-oiled timber, honed stone that conceals minor wear, and dedicated larder and hallway storage so everyday objects have an effortless home.",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    phase: "Understand",
    title: "Site, Daylight & Daily Rituals",
    description:
      "We review architectural drawings, orientation, existing furniture, and how the space needs to function at 7:00 am as well as 9:00 pm. Together we establish a clear spatial brief and material boundaries.",
  },
  {
    step: "02",
    phase: "Develop",
    title: "Spatial Plan & Tactile Palette",
    description:
      "We develop scaled floor plans, joinery elevations, and physical material palettes—testing how solid oak grain, lime plaster, honed stone, and woven textiles respond to your room's specific light.",
  },
  {
    step: "03",
    phase: "Detail",
    title: "Documentation, Sourcing & Placement",
    description:
      "We prepare detailed drawings for cabinetmakers and contractors, coordinate furniture and lighting specifications, and guide final placement so the finished space settles naturally.",
  },
];

export function getProjectBySlug(slug: string): ProjectStudy | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getNextProject(currentSlug: string): ProjectStudy {
  const index = PROJECTS.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return PROJECTS[0];
  return PROJECTS[(index + 1) % PROJECTS.length];
}
