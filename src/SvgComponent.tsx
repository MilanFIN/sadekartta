import * as React from "react"

const SvgComponent = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    width="11mm"
    height="11mm"
    viewBox="0 0 11 11"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      style={{
        fill: "#000",
        fillOpacity: 1,
        strokeWidth: 0.70785,
      }}
      cx={5.5}
      cy={5.5}
      r={5.5}
    />
    <circle
      style={{
        fill: "#1715ff",
        fillOpacity: 1,
        strokeWidth: 0.316687,
      }}
      cx={5.5}
      cy={5.5}
      r={5.4}
    />
  </svg>
)

export default SvgComponent
