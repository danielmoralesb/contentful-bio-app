import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function BioList({ bios }) {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-between md:-m-2">
      {bios.map((bio) => (
        <div
          key={bio.sys.id}
          className="bio-box mb-4 md:m-2 md:grow md:basis-3"
        >
          <div className="flex flex-col h-full bg-gray-800 md:rounded-lg">
            <Image
              src={`https:${bio.fields.profileImage.fields.file.url}`}
              alt={bio.fields.name}
              width={bio.fields.profileImage.fields.file.details.image.width}
              height={bio.fields.profileImage.fields.file.details.image.height}
              className="w-full h-70 rounded-t-lg object-cover"
            />
            <div className="grow p-4 md:mt-10 md:flex md:flex-col md:flex-wrap">
              <h2 className="text-3xl font-bold mb-2">
                {bio.fields.name} {bio.fields.lastName}
              </h2>
              <h3 className="text-1xl mb-10 uppercase text-gray-400">
                {bio.fields.position}
              </h3>
              <div className="mb-10 text-gray-400">
                {documentToReactComponents(bio.fields.biography)}
              </div>
              <ul className="bio-links">
                {bio.fields.linkedIn && (
                  <li>
                    <a
                      href={bio.fields.linkedn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bio-link bio-link--linkedin"
                    >
                      <span className="sr-only">linkedin</span>
                    </a>
                  </li>
                )}
                {bio.fields.codepen && (
                  <li>
                    <a
                      href={bio.fields.codepen}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bio-link bio-link--codepen"
                    >
                      <span className="sr-only">codepen</span>
                    </a>
                  </li>
                )}
                {bio.fields.gitHub && (
                  <li>
                    <a
                      href={bio.fields.gitHub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bio-link bio-link--github"
                    >
                      <span className="sr-only">github</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
