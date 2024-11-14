import dotenv from "dotenv";

dotenv.config();

async function fetchGraphQL(query, preview = false) {
  const accessToken = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;

  console.log("Using access token:", accessToken);

  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}

export async function getAllBios() {
  const query = `
    {
      bioCollection {
        items {
          sys {
            id
          }
          name
          lastName
          position
          biography {
            json
          }
          profileImage {
            url
            width
            height
          }
          socialMedia,
          linkedIn
        }
      }
    }
  `;

  try {
    const response = await fetchGraphQL(query);
    return response.data.bioCollection.items;
  } catch (error) {
    console.error("Error fetching entries:", error);
    return [];
  }
}
