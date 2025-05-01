"use client"

import { useEffect, useState } from "react"
import { BellIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSession } from "@/hooks/auth-hooks";
import { INotification } from "@/interfaces/INotification"
import Link from "next/link"

const CNotificationBar = () => {
  const { data: session, isPending, isError, error } = useSession();

  const [notifications, setNotifications] = useState<INotification[]>([])
  const [latestCreatedAt, setLatestCreatedAt] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try { 
        const response = await fetch(`/api/v1/${session?.user.id}/notifications`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the API returns an array of notifications
        setNotifications(data);

        if (data.length > 0) {
          // Calculate new unread notifications
          const latestNotification = data.reduce((prev: INotification, current: INotification) => {
            return (new Date(current.createdAt) > new Date(prev.createdAt)) ? current : prev
          }, data[0]);

          if (latestCreatedAt) {
            const newNotificationsCount = data.filter(
              (notification: INotification) =>
                new Date(notification.createdAt) > new Date(latestCreatedAt)
            ).length;
            setUnreadCount((prevCount) => prevCount + newNotificationsCount);
          } else {
            setUnreadCount(data.length);
          }

          // Update latestCreatedAt with the newest notification
          setLatestCreatedAt(latestNotification.createdAt);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    // Fetch notifications immediately when the component mounts
    fetchNotifications();

    // Set up interval to fetch notifications every 10 seconds
    const intervalId = setInterval(fetchNotifications, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [latestCreatedAt, session?.user.id]);

  return !isPending && !isError && (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="relative bg-background dark:bg-background border-foreground dark:border-foreground"
          aria-label="Open notifications"
        >
          <BellIcon size={16} aria-hidden="true" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1 ">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-128 overflow-auto p-1" align="end" onOpenAutoFocus={(e) => {
        setUnreadCount(0)
      }}>
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="bg-border -mx-1 my-1 h-px"
        ></div>
        {notifications.length === 0 && (
          <div className="flex items-center justify-center text-sm text-muted-foreground p-3">
            No notifications yet
          </div>
        )}
        <div className="flex flex-col gap-2 divide-y">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 text-sm p-3 leading-relaxed"
            >
              <div> 
                Hooray 🥳! Course generated for the requested topic <span className="font-bold">{notification.courseTopic}</span>.
              </div>
              <Link href={`/course/${notification.courseId}`} className="text-sm border border-primary p-1 text-primary rounded px-2 py-1 w-fit"><div className="">Go to course</div></Link>
              <div className="text-xs text-foreground/50">{new Date(notification.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}</div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default CNotificationBar;