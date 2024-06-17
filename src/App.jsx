import { useEffect, useMemo, useState } from "react";
import Color from "./components/Color";
import Input from "./components/Input";
import Textarea from "./components/Textarea";
import { useDebounce } from "@uidotdev/usehooks";
import Loader from "./components/Loader";
import bbcodeTemplate from "./bbcodeTemplate";
import CopyButton from "./components/CopyButton";
import ButtonGroup from "./components/ButtonGroup";

function App() {
    const [user, setUser] = useState("");
    const [mincolor, setMincolor] = useState("#79a9cf");
    const [maxcolor, setMaxcolor] = useState("#79a9cf");
    const [blankcolor, setBlankcolor] = useState("#bebebe");
    const [textcolor, setTextcolor] = useState("#000000");
    const [format, setFormat] = useState("svg");
    const [imgLoading, setImgLoading] = useState(true);

    const [url, usernameError] = useMemo(() => {
        const username = /shikimori\.(one|org)\/(?<username>[^\/]+)\/?$/i.exec(user)?.groups.username ?? user;

        if (username.indexOf("/") !== -1) {
            return ["", true];
        }

        const queryString = new URLSearchParams({
            user: username || "ivanik",
            blankcolor: blankcolor,
            mincolor: mincolor,
            maxcolor: maxcolor,
            textcolor: textcolor,
        }).toString();

        return [`${import.meta.env.VITE_API}/stat.${format}?${queryString}`, false];
    }, [user, blankcolor, mincolor, maxcolor, textcolor, format]);

    useEffect(() => {
        setImgLoading(true);
    }, [url]);

    const imgUrl = useDebounce(url, 1500);

    const bbcode = bbcodeTemplate(url);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col justify-stretch space-y-4 w-full max-w-3xl">
                <div className="flex flex-col items-center mt-4">
                    <h1 className="text-3xl font-bold">Shikimori stat</h1>
                    <p>GitHub-like статистика просмотра аниме</p>
                </div>

                <form className="flex flex-col">
                    <Input label="Ник или ссылка на профиль" id="username" placeholder="https://shikimori.one/ivanik" value={user} onChange={setUser} error={usernameError && "Неверное значение"} />
                    <div className="mx-2 text-sm text-gray-500">
                        {"Ваш список должен быть открыт. Настройки > Профиль > Могут видеть мой список > Все посетители сайта"} 
                    </div>

                    <div className="flex flex-row">
                        <Color className="w-1/2" label="Минимальная активность" id="mincolor" color={mincolor} onChange={setMincolor} />
                        <Color className="w-1/2" label="Максимальная активность" id="maxcolor" color={maxcolor} onChange={setMaxcolor} />
                    </div>
                    <div className="flex flex-row">
                        <Color className="w-1/2" label="Отсутствие активности" id="blankcolor" color={blankcolor} onChange={setBlankcolor} />
                        <Color className="w-1/2" label="Текст" id="textcolor" color={textcolor} onChange={setTextcolor} />
                    </div>
                </form>

                <div className="flex flex-col items-start my-2 mx-2">
                    <h3 className="text-lg">Предпросмотр:</h3>

                    <div className="relative items-center block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 p-4 my-2">
                        <img className={imgLoading ? "opacity-15" : ""} onLoad={() => setImgLoading(false)} src={imgUrl}></img>

                        {imgLoading ? (
                            <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                <Loader />
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-row justify-between mx-2">
                        <h3 className="text-lg">Код для вставки:</h3>
                        <div className="flex flex-row">
                            <div className="flex flex-row">
                                <ButtonGroup
                                    buttons={[
                                        {
                                            key: "svg",
                                            label: "SVG",
                                            onClick: () => setFormat("svg"),
                                            active: format === "svg",
                                        },
                                        {
                                            key: "png",
                                            label: "PNG",
                                            onClick: () => setFormat("png"),
                                            active: format === "png",
                                        },
                                    ]}
                                />
                            </div>
                            <CopyButton label="Копировать" text={bbcode} />
                        </div>
                    </div>

                    <Textarea content={bbcode} />
                </div>

                <div className="mx-2 text-sm text-gray-500 text-center">
                    <p>Телеграм канал <a className="text-blue-500" href="https://t.me/ivanik_log">@ivanik_log</a></p>
                    <p>Если что-то сломалось - пишите сюда <a className="text-blue-500" href="https://t.me/ivanik7">@ivanik7</a></p>
                    <p>Мыши плакали, кололись, но продолжали <a className="text-blue-500" href="https:/github.com/ivanik7/shikimori-stat">опенсорсить</a></p>
                </div>
            </div>
        </div>
    );
}

export default App;
