"use client";

import UserTabs from "@/components/medium/UserTabs";
import DeleteButton from "@/components/small/DeleteButton";
import useProfile from "@/hooks/useProfile";
import { OrderType } from "@/types/small-types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Orders() {
  const { isLoading, user } = useProfile();
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/order");
      if (res.ok) {
        const userOrders = await res.json();
        setOrders(userOrders);
      }
    })();
  }, []);

  if (isLoading) return "Loading...";
  return (
    <main className="mb-16">
      <UserTabs isAdmin={user?.isAdmin!} />

      {/* content */}
      <div className="max-w-2xl mx-auto">
        {/* categories */}
        <div>
          {/* title */}
          {orders.length < 1 ? (
            <span className="text-red-500">No items are avalible!</span>
          ) : (
            <>
              <span className="text-sm">Edit category:</span>
              {/* items */}
              <ul className="flex flex-col gap-y-1">
                {orders.map((order) => (
                  <li
                    key={order._id}
                    className="flex gap-x-6 items-center bg-gray-200 px-4 py-2 text-black font-bold rounded-xl cursor-pointer"
                  >
                    {/* left */}
                    <div
                      className={`w-20 text-white flex justify-center py-2 rounded-md ${
                        order.paid ? "bg-green-700" : "bg-red-500"
                      }`}
                    >
                      {order.paid ? "Paid" : "Not paid"}
                    </div>
                    {/* center */}
                    <div className="flex justify-between gap-x-6 grow">
                      {/* content */}
                      <div>
                        {/* email */}
                        <p>{order.email}</p>
                        {/* items */}
                        <p>
                          {order.cartProducts.map((product, index) => (
                            <span
                              className="text-sm text-gray-500"
                              key={product._id}
                            >
                              {product.name}
                              {index < order.cartProducts.length - 1 && ", "}
                            </span>
                          ))}
                        </p>
                      </div>
                      {/* date */}
                      <div>
                        <span className="text-sm text-gray-600">
                          {order.createdAt.replace("T", " ").slice(0, 16)}
                        </span>
                      </div>
                    </div>
                    {/* show link */}
                    <Link
                      className="py-2 px-6 rounded-lg border border-gray-300 hover:bg-gray-100"
                      href={`/orders/${order._id}`}
                    >
                      Show order
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
