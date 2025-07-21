import React, { useEffect, useState } from "react";
import axiosPrivet from "../../../hooks/axiosPrivet";
import { socket } from "../../../../utils/socket";
import Notification from "./Notification";
import { useQuery } from "react-query";
import Loading from "../../../shared/Loading";

const Notifications = () => {
  const {
    data: result,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(
    "notifications",
    async () => await axiosPrivet.get("notifications")
  );

  console.log(result?.data?.notifications);
  console.log("error", error);

  useEffect(() => {
    let isMounted = true;
    const getFetch = async () => {
      try {
        const { data: userData } = await axiosPrivet.get(`users/getLoginUser`);
        const role = userData?.user?.role;

        if (role === "admin") {
          socket.on("connect", () => {
            console.log("✅ Socket connected:", socket.id);
          });

          socket.on("disconnect", () => {
            console.log("❌ Socket disconnected");
          });

          socket.emit("join_notification_room", role);

          socket.on("new_notification", (data) => {
            if (isMounted) {
              console.log("🔔 New notification received:", data);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getFetch();

    return () => {
      isMounted = false;
      socket.off("new_notification");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const handleCloseNotification = async (id) => {
    try {
      await axiosPrivet.patch(`notifications/${id}/read`);
      refetch();
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleClearAllNotification = async () => {
    try {
      await axiosPrivet.patch(`notifications/read-all`);
      refetch();
    } catch (error) {
      console.log("error", error.message);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle btn-ghost btn-xs text-info"
      >
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />{" "}
          </svg>
          <span className="badge badge-xs badge-primary indicator-item">
            {result?.data?.notifications?.length}
          </span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-sm dropdown-content bg-base-300 rounded-box z-1 w-80 shadow-sm"
      >
        <div tabIndex={0} className="card-body">
          <div className="flex justify-between items-center mb-5 ">
            <h4 className="text-[15px]">Notifications</h4>
            <button className="rounded-sm btn-sm btn bg-base-100" onClick={()=> handleClearAllNotification()}>
              Clear all
            </button>
          </div>
          <div className="flex flex-col gap-2 max-h-[calc(100vh-180px)] overflow-y-auto will-change-transform">
            {result?.data?.notifications?.length > 0 ?
              result?.data?.notifications.map((notification) => (
                <Notification
                  key={notification._id}
                  notification={notification}
                  handleCloseNotification={handleCloseNotification}
                />
              )) : <div className="h-20 flex justify-center items-center">No new notifications</div> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
