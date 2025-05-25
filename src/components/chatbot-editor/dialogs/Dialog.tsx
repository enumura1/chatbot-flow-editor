import { ReactNode } from 'react';
import {
  Dialog as UIDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onClose, title, children, footer }) => {
  return (
    <UIDialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          {children}
        </div>
        <DialogFooter className="p-4 border-t flex justify-end space-x-2">
          {footer}
        </DialogFooter>
      </DialogContent>
    </UIDialog>
  );
};

export default Dialog;
