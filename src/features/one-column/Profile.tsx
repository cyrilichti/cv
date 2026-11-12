import CvSection from "./CvSection";

type ProfileProps = {
  profile: string[];
};

function Profile({ profile }: ProfileProps) {
  return (
    <CvSection title="À propos">
      <div className="space-y-1.5 text-xs leading-relaxed text-gray-900">
        {profile.map((paragraph, index) => (
          <p key={index} className="text-left hyphens-auto">
            {paragraph}
          </p>
        ))}
      </div>
    </CvSection>
  );
}

export default Profile;
