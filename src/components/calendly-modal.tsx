import * as React from "react";
import { Dialog, DialogContent } from "./ui/dialog";

type CalendlyModalProps = {
  open: boolean;
  onClose: () => void;
  url: string;
};

export function CalendlyModal({ open, onClose, url }: CalendlyModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="p-0 overflow-hidden max-w-3xl w-[95vw] h-[80vh]">
        <iframe
          title="Calendly"
          src={url}
          className="w-full h-full border-0"
          allow="camera; microphone; fullscreen; geolocation"
        />
      </DialogContent>
    </Dialog>
  );
}

export default CalendlyModal;

