"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import useRentModal from "@/app/hooks/useRentModal";
import useCountries from "@/app/hooks/useCountries";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ listings, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const rentModal = useRentModal();
  const { getByValue } = useCountries();

  const onEdit = (listing: SafeListing) => {
    rentModal.onOpen({
      id: listing.id,
      category: listing.category,
      location: getByValue(listing.locationValue),
      guestCount: listing.guestCount,
      roomCount: listing.roomCount,
      bathroomCount: listing.bathroomCount,
      imageSrc: listing.imageSrc,
      // otherImages: listing.otherImages,
      price: listing.price,
      title: listing.title,
      description: listing.description,
    });
  };

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
            onEdit={onEdit}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;