"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

const ConfirmModel = ({children,onConfirm}:ConfirmModalProps) => {
  return (
   <AlertDialog>
    <AlertDialogTrigger asChild>
        {children}

    </AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
            <AlertDialogDescription>This Action cannot be Undone</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>
                Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Contunue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
   </AlertDialog>
  )
};

export default ConfirmModel;
