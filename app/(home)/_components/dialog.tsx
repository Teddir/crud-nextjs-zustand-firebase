import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CustomDialog({
  children,
  title,
  desc,
  renderContent,
  handleSubmit,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  desc: string;
  renderContent: React.ReactNode;
  handleSubmit: { onClick: () => void; text: string; disabled: boolean };
}>) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        {renderContent}
        <DialogClose id='closeDialog' />
        <DialogFooter>
          <Button
            type='submit'
            disabled={handleSubmit?.disabled}
            onClick={() => handleSubmit?.onClick && handleSubmit?.onClick()}>
            {handleSubmit?.text}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
