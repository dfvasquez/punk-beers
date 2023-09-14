import './ActionButton.css'

interface IActionButton {
  text: string
  type: 'primary' | 'secondary'
  onClick: () => void
}

export default function ActionButton({ text, onClick, type = 'primary' }: IActionButton) {
  return <div className={`action-button ${type}`} onClick={onClick}>{text}</div>
}