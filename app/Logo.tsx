export default function Logo() {
  return (
    <span className="nav_logo-img" aria-label="Dune & Oak">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 1860 220"
        role="img"
        aria-hidden="true"
      >
        <text
          x="50%"
          y="176"
          textAnchor="middle"
          fill="currentColor"
          style={{
            fontFamily: "'Monotype helvetica now display', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: 700,
            fontSize: "208px",
            letterSpacing: "-0.03em",
          }}
        >
          DUNE <tspan style={{ fontFamily: "'Monotype helvetica now display lt it', Georgia, serif", fontWeight: 400 }}>&amp;</tspan> OAK
        </text>
      </svg>
    </span>
  );
}
