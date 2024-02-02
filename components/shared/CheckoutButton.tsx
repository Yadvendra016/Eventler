"use client";
import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  return (
    <div className="flex items-center gap-3">
      {/* cannot  buy past event */}
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickes are no longer available.
        </p>
      ) : (
        <>
          {/* if not signed in */}
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Get Ticket</Link>
            </Button>
          </SignedOut>
          {/* if signed in */}
          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
