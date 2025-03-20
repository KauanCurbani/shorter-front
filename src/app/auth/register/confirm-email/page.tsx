"use client"
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";

export default function Page () {
  const router = useRouter();
  return <div>
    <h1 className="text-2xl font-bold">Confirm your email</h1>
    <span className="text-muted-foreground text-xs uppercase">
      We have sent a 6-digit code to your email address. Please enter the code below.
    </span>
    
    <InputOTP maxLength={6} containerClassName="flex justify-center my-4">
      <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
    </InputOTP>
    
    <Button className="w-full" onClick={() => router.push("/auth/login")}>Check email</Button>
    <Button className="w-full" variant={"link"} onClick={router.back}>Go back</Button>
  </div>
}