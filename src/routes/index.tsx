import { createFileRoute } from "@tanstack/react-router";
import Home from "../components/ui/Home";

export const Route = createFileRoute("/")({
  component: Home,
});
