import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

export interface ListItemProps {
  href: string;
  iconContent?: IconDefinition;
  content: string;
}
export enum InputType {
  CHECKBOX = 'checkbox',
  EMAIL = 'email',
  NUMBER = 'number',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
  TEXT = 'text'
}

export interface InputProps {
  id: string;
  name: string;
  type: InputType;
  placeholder?: string;
  label: string;
  errorMessage?: string;
}
export enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button'
}
export interface ButtonProps {
  text: string;
  type: ButtonType;
  handleClick?: (e: any) => void;
}
