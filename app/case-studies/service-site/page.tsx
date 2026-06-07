import { Metadata } from "next";
import ServiceSiteClient from "./components/ServiceSiteClient";

export const metadata: Metadata = {
  title: "Fahad Dev Studio – Service Site",
  description: "Freelance tech consulting & development services by Fahad Aba-Alkhail",
};

export default function ServiceSitePage() {
  return <ServiceSiteClient />;
}
