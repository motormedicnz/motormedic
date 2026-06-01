import React from "react";

const BRANDS = [
  { name: "TOYOTA",   logo: "/brand/toyota.png"   },
  { name: "BMW",      logo: "/brand/bmw.svg"       },
  { name: "AUDI",     logo: "/brand/audi.png"      },
  { name: "FORD",     logo: "/brand/ford.png"      },
  { name: "MAZDA",    logo: "/brand/mazda.png"     },
  { name: "MERCEDES", logo: "/brand/marcedes.png"  },
  { name: "NISSAN",   logo: "/brand/nissan.png"    },
  { name: "HYUNDAI",  logo: "/brand/hyundai.png"   },
];

export const Brand = () => {
  return (
    <>
      {/* Silver top divider */}
      <div className="footer-content" style={{ paddingTop: "2px" }}>
        <div className="silver-divider" />
      </div>

      {/* ══ BRANDS MARQUEE ══ */}
      <div className="footer-content footer-brands-section">
        <p className="footer-brands-label">Trusted by drivers of</p>
        <div className="marquee-fade">
          <div className="marquee-track">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <div key={`${brand.name}-${i}`} className="brand-item">
                <img src={brand.logo} alt={brand.name} />
                <span>{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Crimson mid-separator */}
      <div className="footer-content">
        <div className="crimson-divider" />
      </div>
    </>
  );
};

export default Brand;
