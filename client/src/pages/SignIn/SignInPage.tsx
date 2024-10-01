import { inputs } from './SignInPage.data';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ButtonType } from '../../types/common';

export default function SignInPage() {
  function handleClick(e: any) {
    e.preventDefault();
    console.log('Sign in...');
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl m-12">Welcome back!</h1>
      <form>
        {inputs.map((input) => (
          <Input {...input} />
        ))}
        <Button text="Sign in" type={ButtonType.SUBMIT} handleClick={handleClick} />
      </form>
    </div>
  );
}
