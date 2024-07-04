import Image from "next/image";

export default function Profile() {
  return (
    <main className="mb-16">
      {/* title */}
      <h1 className="text-redColor text-4xl mt-8 text-center mb-10">Profile</h1>

      {/* content */}
      <div>
        {/* left */}
        <div>
          {/* profile photo */}
          <Image
            src="/images/person.png"
            alt="person profile image"
            width="10000"
            height="10000"
          />
          {/* edit button */}
          <button type="button">Edit</button>
        </div>
        {/* right */}
        <form>
          {/* first and last name */}
          <input type="text" placeholder="First and last name" />
          <input type="text" />
          <button type="submit">Save</button>
        </form>
      </div>
    </main>
  );
}
