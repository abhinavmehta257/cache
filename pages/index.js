import { useRouter } from "next/router";
import { useEffect } from "react";

export default function TwitterLoginButton() {
  const router = useRouter();
  useEffect(()=>{
    router.push('dashboard/home')
  })
  return (
    <div></div>
  )
}
