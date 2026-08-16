import PetCard from "./PetCard";

function MyPets() {
  return (
    <div className="mt-10">

      <div className="flex justify-between mb-5">

        <h2 className="text-2xl font-bold">
          My Pets
        </h2>

        <button className="text-blue-600 font-semibold">
          View All
        </button>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

        <PetCard
          image="https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800"
          name="Bruno"
          breed="Golden Retriever"
          age="3 Years"
        />

        <PetCard
          image="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800"
          name="Luna"
          breed="Persian Cat"
          age="2 Years"
        />

        <PetCard
          image="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800"
          name="Buddy"
          breed="Rabbit"
          age="1 Year"
        />

      </div>

    </div>
  );
}

export default MyPets;