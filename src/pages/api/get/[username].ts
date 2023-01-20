// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface Data {
  icon: string;
  name: string;
  description: string;
  id: string;
  username: string;
  followers: number;
  following: number;
  tweetCount: number;
  created: Date;
  url?: string;
}

interface ResponseGetUserByUserName {
  data: {
    profile_image_url: string;
    username: string;
    description: string;
    entities?: {
      url?: {
        urls: {
          start: number;
          end: number;
          url: string;
          expanded_url: string;
          display_url: string;
        }[];
      };
      description?: {
        urls: {
          start: number;
          end: number;
          url: string;
          expanded_url: string;
          display_url: string;
        }[];
      };
    };
    name: string;
    url?: string;
    id: string;
    public_metrics: {
      followers_count: number;
      following_count: number;
      tweet_count: number;
      listed_count: number;
    };
    created_at: Date;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | { error: string }>) {
  const { TWITTER_BEARER_TOKEN } = process.env;
  if (TWITTER_BEARER_TOKEN === undefined) throw new Error("TWITTER_BEARER_TOKEN is undefined");

  // url と header を設定する
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${TWITTER_BEARER_TOKEN}`);
  const url = new URL(`https://api.twitter.com/2/users/by/username/${req.query.username as string}`);
  const sp = new URLSearchParams("user.fields=created_at,description,entities,profile_image_url,public_metrics");
  url.search = sp.toString();

  try {
    if (fetch === undefined) {
      throw new Error("fetch is undefined");
    }

    // twitter api からデータを取得する
    const r = await fetch(url.href, {
      method: "GET",
      redirect: "follow",
      headers,
    });
    const json = (await r.json()) as ResponseGetUserByUserName;

    // twitter の description をパースする
    json.data.entities?.description?.urls.forEach((url) => {
      json.data.description = json.data.description.replace(url.url, url.expanded_url);
    });

    // twitter のユーザー情報から url を取得する
    if (json.data.entities?.url?.urls.length) {
      json.data.url = json.data.entities.url.urls[0].expanded_url;
    } else {
      json.data.url = undefined;
    }

    // レスポンスを返す
    res.status(200).json({
      icon: json.data.profile_image_url,
      name: json.data.name,
      description: json.data.description,
      id: json.data.id,
      username: json.data.username,
      followers: json.data.public_metrics.followers_count,
      following: json.data.public_metrics.following_count,
      tweetCount: json.data.public_metrics.tweet_count,
      created: json.data.created_at,
      url: json.data.url,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "unknown error" });
    }
  }
}
