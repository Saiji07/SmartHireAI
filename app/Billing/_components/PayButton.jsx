
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function PayButton({amount,credits})
{
    const onPaymentSuccess=()=>{

    }
    return(
        <div>
        <Dialog>
  <DialogTrigger>
    <Button className='w-full'>Buy Credits</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Checkout</DialogTitle>
      <DialogDescription asChild>
        <PayPalButtons style={{ layout: "horizontal" }}
        onApprove={()=>onPaymentSuccess()}
        onCancel={()=>toast("Payment Canceled!")}
        createOrder={(data,actions)=>{
            return actions.order.create({
                purchase_units:[{
                    amount:{
                        value:amount,
                        currency_code:'USD'
                    }
                }]
            })
        }}
        />
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
</div>
        
    );
}