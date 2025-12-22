import { redirect } from "next/navigation"

export default function Admin() {
  redirect("/pages/auth/access-code");
}