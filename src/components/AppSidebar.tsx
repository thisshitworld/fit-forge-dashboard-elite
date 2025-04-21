
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BarChart, History, Dumbbell, Star } from "lucide-react"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart,
  },
  {
    title: "Workout History",
    url: "#workout-history",
    icon: History,
  },
  {
    title: "Personal Records",
    url: "#personal-records",
    icon: Star,
  },
  {
    title: "Exercises",
    url: "#progress-charts",
    icon: Dumbbell,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-playfair">Fit Forge</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-2 py-1 text-lg font-semibold hover:bg-accent rounded transition hover-scale">
                      <item.icon size={22} className="text-primary" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
