import './ActionButton.css'

export interface IActionButton {
  text: string
  type: 'primary' | 'secondary' | 'inactive' | 'disabled'
  onClick: () => void
}

export default function ActionButton({ text, onClick, type = 'primary' }: IActionButton) {
  return <div className={`action-button ${type}`} onClick={onClick}>{text}</div>
}
