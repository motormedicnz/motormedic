import {
  Wrench,
  Cog,
  Settings2,
  Droplets,
  CircleDot,
  Layers,
  Zap,
  ScanLine,
  PaintBucket,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  image: string;
  shortDescription: string;
  description: string;
  features: string[];
};

export const SERVICES: Service[] = [
  {
    id: "mechanical-repairs",
    icon: Wrench,
    title: "Complete Mechanical Repairs",
    image: "/service/menu/img1.png",
    shortDescription:
      "Full-spectrum mechanical repair work carried out to manufacturer standards.",
    description:
      "From minor adjustments to complex component replacements, our workshop handles the full range of mechanical repair work. Every job is diagnosed correctly before we touch a tool, and we use quality parts backed by a workmanship guarantee. Whether it's a cooling system fault, a fuel system issue, or a worn drive component, you leave with a car you can trust.",
    features: [
      "Accurate fault diagnosis before any work begins",
      "OEM and quality aftermarket parts used throughout",
      "Cooling, fuel, exhaust, and drivetrain repairs",
      "Workmanship guarantee on all repairs",
      "Transparent quoting with no hidden charges",
      "Road test completed before every handover",
    ],
  },
  {
    id: "engine-repair",
    icon: Cog,
    title: "Engine Repair & Replace",
    image: "/service/menu/img2.png",
    shortDescription:
      "Expert engine rebuilds and full replacements for all makes and models.",
    description:
      "Engine failure doesn't have to mean the end of your vehicle. Our technicians carry out everything from top-end gasket work and timing repairs through to full engine rebuilds and reconditioned engine supply and fit. We assess each situation honestly and recommend the most cost-effective path — repair, rebuild, or replace.",
    features: [
      "Full engine strip-down and inspection",
      "Head gasket, timing, and top-end repairs",
      "Reconditioned and remanufactured engine supply",
      "Engine removal, fit, and run-in procedure",
      "Cooling system flush and refill included",
      "Post-installation diagnostic check",
    ],
  },
  {
    id: "transmission-repair",
    icon: Settings2,
    title: "Transmission Repair & Replace",
    image: "/service/menu/img3.png",
    shortDescription:
      "Manual and automatic transmission repair, rebuild, and replacement.",
    description:
      "Transmission problems affect drivability, fuel economy, and safety. We service and repair manual gearboxes, automatic transmissions, and CVTs — covering slipping gears, delayed engagement, fluid leaks, and complete failures. When a rebuild isn't economical, we source and fit quality reconditioned units with full installation warranties.",
    features: [
      "Manual and automatic transmission servicing",
      "Gearbox fluid exchange and filter replacement",
      "Clutch inspection, adjustment, and replacement",
      "Fault code scanning and hydraulic testing",
      "Reconditioned transmission supply and fit",
      "Test drive verification after all transmission work",
    ],
  },
  {
    id: "oil-change",
    icon: Droplets,
    title: "Oil Change & Services",
    image: "/service/menu/img4.png",
    shortDescription:
      "Correct-grade oil, quality filters, and a full fluid check every visit.",
    description:
      "Regular oil changes are the single most effective thing you can do for engine longevity. We use the manufacturer-specified oil grade for your vehicle, replace the filter, and check all other fluid levels as standard. Our service includes a basic safety inspection so we can flag anything that needs attention before it becomes a problem.",
    features: [
      "Manufacturer-specified oil grade used on every service",
      "Oil filter replacement as standard",
      "Coolant, brake fluid, and power steering checked",
      "Windscreen washer fluid topped up",
      "Basic safety inspection included",
      "Service sticker and reminder provided",
    ],
  },
  {
    id: "brake-service",
    icon: CircleDot,
    title: "Brake Service",
    image: "/service/menu/img5.png",
    shortDescription:
      "Brake inspection, pad and rotor replacement, and full system checks.",
    description:
      "Effective braking is non-negotiable. We inspect the complete brake system — pads, rotors, calipers, brake lines, and fluid — and replace only what is actually worn or damaged. Every brake job is followed by a brake bed-in procedure and road test to confirm full system performance before the vehicle is returned.",
    features: [
      "Full brake system inspection front and rear",
      "Pad and rotor replacement using quality parts",
      "Caliper inspection, slide pin lubrication, and rebuild if required",
      "Brake fluid condition test and replacement if needed",
      "Handbrake adjustment and cable inspection",
      "Road test and brake bed-in before handover",
    ],
  },
  {
    id: "suspension-work",
    icon: Layers,
    title: "Suspension Work",
    image: "/service/menu/img6.png",
    shortDescription:
      "Shock absorbers, ball joints, bushings, and full suspension rebuilds.",
    description:
      "Worn suspension affects steering feel, tyre wear, braking distance, and passenger comfort. We diagnose and repair the complete suspension system — shock absorbers, struts, control arms, ball joints, tie rod ends, and bushings. All suspension work is followed by a wheel alignment check to protect your tyre investment.",
    features: [
      "Shock absorber and strut inspection and replacement",
      "Ball joint, control arm, and bush assessment",
      "Tie rod end and steering rack inspection",
      "Wheel bearing check and replacement",
      "Wheel alignment check following all suspension work",
      "Road test to confirm handling and stability",
    ],
  },
  {
    id: "hybrid-repairs",
    icon: Zap,
    title: "Hybrid System Repairs",
    image: "/service/menu/img7.png",
    shortDescription:
      "High-voltage hybrid system diagnostics, servicing, and component repair.",
    description:
      "Hybrid vehicles require trained technicians and the right equipment. Our team is experienced with high-voltage battery systems, inverters, electric motors, and regenerative braking systems across Toyota, Honda, Lexus, and other hybrid platforms. We carry out hybrid-specific servicing and diagnose system faults accurately using manufacturer-level diagnostic tools.",
    features: [
      "High-voltage battery health and capacity assessment",
      "Hybrid system fault code scanning and diagnosis",
      "Inverter and electric motor inspection",
      "Regenerative braking system service",
      "12V auxiliary battery and charging system check",
      "Coolant flush for hybrid thermal management system",
    ],
  },
  {
    id: "diagnostics",
    icon: ScanLine,
    title: "Computer Diagnostics",
    image: "/service/menu/img8.png",
    shortDescription:
      "Professional-grade OBD scanning and live data analysis across all systems.",
    description:
      "A warning light is a starting point, not an answer. We use professional diagnostic equipment to read fault codes across engine, transmission, ABS, airbag, and body systems — then we verify those codes through live data and physical inspection before recommending repairs. You receive a clear written report of findings.",
    features: [
      "Full OBD-II multi-system fault code scan",
      "Live sensor data and freeze frame analysis",
      "Engine, ABS, SRS, and transmission system coverage",
      "Pinpoint testing to confirm fault root cause",
      "Written diagnostic report provided",
      "Repair recommendation and quote included",
    ],
  },
  {
    id: "panel-beating",
    icon: PaintBucket,
    title: "Panel Beating & Painting",
    image: "/service/menu/img9.png",
    shortDescription:
      "Structural panel repairs and factory-matched resprays for all damage types.",
    description:
      "Collision damage, rust, and dents are handled by our panel shop to a high standard of finish. We carry out structural and cosmetic repairs — from minor dent removal and localised resprays through to full quarter panel replacement. All paintwork is colour-matched to the factory code for a seamless result.",
    features: [
      "Collision and impact damage assessment and repair",
      "Dent removal including paintless dent repair where suitable",
      "Full and partial panel replacement",
      "Factory colour code matching on all respray work",
      "Rust treatment and corrosion protection",
      "Panel alignment and shut-line inspection after all repairs",
    ],
  },
  {
    id: "detailing",
    icon: Sparkles,
    title: "Detailing",
    image: "/service/menu/img10.png",
    shortDescription:
      "Paint correction, interior restoration, and protective coating application.",
    description:
      "Our detailing work goes well beyond a standard wash. We offer paint decontamination, machine polishing, ceramic coating, interior deep cleaning, leather conditioning, and fabric protection. Each detail is carried out by hand with professional products to restore and protect your vehicle's finish properly.",
    features: [
      "Exterior hand wash, decontamination, and clay bar treatment",
      "Machine polish for paint correction and gloss restoration",
      "Ceramic coating packages for long-term protection",
      "Interior vacuum, shampoo, and surface clean",
      "Leather cleaning and conditioning",
      "Glass polish and tyre dressing included",
    ],
  },
  {
    id: "roadside-assistance",
    icon: TriangleAlert,
    title: "Roadside Assistance",
    image: "/service/menu/img11.png",
    shortDescription:
      "On-call mechanical assistance for breakdowns, flat tyres, and jump starts.",
    description:
      "Breakdowns happen at the worst times. Our roadside assistance covers jump starts, flat tyre changes, minor mechanical issues, and towing to our workshop when a roadside repair isn't possible. We aim to reach you quickly, assess the problem accurately, and get you moving again or safely recovered without delay.",
    features: [
      "Jump start and battery replacement on site",
      "Flat tyre change or inflation assistance",
      "Fuel delivery for vehicles run dry",
      "Minor mechanical fault assessment and repair",
      "Towing to our workshop when required",
      "Available for private, fleet, and commercial vehicles",
    ],
  },
  {
  id: "other-service",
  icon: Wrench,
  title: "Other Service",
  image: "/service/menu/img12.png",
  shortDescription:
    "Can't find your service? Tell us what you need.",
  description:
    "If your required service isn't listed, submit a booking request and describe it in detail.",
  features: [
    "Custom repair requests",
    "Performance modifications",
    "Specialist work",
    "Fleet enquiries",
    "Insurance repairs",
    "Anything else automotive"
  ],
}
];