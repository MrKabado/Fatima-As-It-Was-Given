import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function ButtonSubmit({ props }: any) {
  const submitted = props.submitted;
  return (
    <div>
      {!submitted ? (
        <Button type={props.buttonType} size="sm" className={`bg-indigo-600 hover:bg-indigo-700 text-white ${props.className}`} onClick={props.btnOnClick}>
          {props.btnText}
        </Button>
      ):(
        <Button type={props.buttonType} size="sm" disabled className={`bg-indigo-600 text-white ${props.className}`} onClick={props.btnOnClick}>
          <Spinner className="mr-2 h-4 w-4 animate-spin" />
          {props.btnLoadingText}...
        </Button>
      )}
    </div>
  );
}
