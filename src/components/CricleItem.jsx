// eslint-disable-next-line react/prop-types
const CricleItem = ({ item, x, y, text, color = '#fff', onClickRemove }) => {
  return (
    <g
      style={{ cursor: 'pointer' }}
      onClick={() => {
        onClickRemove && onClickRemove(item)
      }}
    >
      <circle r="20" cx={x} cy={y} fill={color} stroke="black" />
      <text
        x={x - 5}
        y={y + 5}
        fill="black"
        textAnchor="middle"
        dominantBaseline="middle"
        dy="-4px"
        dx="4px"
      >
        {text}
      </text>
    </g>
  )
}

export default CricleItem
