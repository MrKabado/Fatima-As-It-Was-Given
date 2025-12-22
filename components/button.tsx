import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function ButtonSubmit({ props }: any) {
  const submitted = props.submitted;
  return (
    <div>
      {!submitted ? (
        <Button type={props.buttonType} size="lg" className={`bg-black hover:bg-white text-white hover:text-black hover:border ${props.className}`} onClick={props.btnOnClick}>
          {props.btnText}
        </Button>
      ):(
        <Button type={props.buttonType} size="lg" disabled className={`bg-white text-black ${props.className}`} onClick={props.btnOnClick}>
          <Spinner className="mr-2 h-4 w-4 animate-spin" />
          {props.btnLoadingText}...
        </Button>
      )}
    </div>
  );
}
