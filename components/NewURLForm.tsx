"use client";

import getAliasChecker from "@/lib/getAliasChecker";
import getUrlChecker from "@/lib/getUrlChecker";
import postAlias from "@/lib/postAlias";
import { Button, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";

export default function NewURLForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [message, setMessage] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    function handleCopy() {
        navigator.clipboard.writeText(shortUrl);
    }

    return (
        <form
            className="max-w-lg w-full mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
            onSubmit={async (e) => {
                e.preventDefault();
                setMessage("");

                const urlCheck = getUrlChecker(url);
                if (!urlCheck) {
                    setMessage("Invalid URL. Please check and retry.");
                    return;
                }

                const aliasOK = await getAliasChecker(alias);
                if (!aliasOK) {
                    setMessage("Alias already taken! Try another.");
                    return;
                }

                const saved = await postAlias(alias, url);
                if (!saved) {
                    setMessage("Something went wrong saving your alias.");
                    return;
                }

                setShortUrl(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${alias}`);
                setMessage("Success!");
            }}
        >
            <FormHelperText>Paste and get results</FormHelperText>

            <TextField
                variant="filled"
                label="URL"
                placeholder="Paste your URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                fullWidth
            />

            <TextField
                variant="filled"
                label="Alias"
                placeholder="Enter your alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                fullWidth
            />

            <Button
                variant="contained"
                type="submit"
                disabled={url === "" || alias === ""}
                fullWidth
                sx={{ padding: "10px" }}
            >
                SHORTEN
            </Button>

            {message && (
              <p className="text-center text-sm text-red-600 p-4" >{message}</p>
            )}

            {shortUrl && (
                <div className="p-3 bg-gray-100 rounded-md space-y-2">
                    <p className="font-medium text-sm text-black">Your shortened URL:</p>
                    <div className="flex flex-row justify-between items-center">
                        <a
                            href={shortUrl}
                            target="_blank"
                            className="text-blue-600 underline p-2"
                        >
                            {shortUrl}
                        </a>

                        <button
                            type="button"
                            onClick={handleCopy}
                            className="text-md text-blue-700 p-2 border-2 border-black shadow rounded"
                        >
                            Copy
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
}
