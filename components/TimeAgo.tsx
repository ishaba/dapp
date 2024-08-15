import "dayjs/locale/en";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

dayjs().format();

export default function TimeAgoComponent({ timeStamp }: { timeStamp: string }) {
  const data = Number(timeStamp) * 1000;
  return <div className="inline-block">{dayjs(data).fromNow()}</div>;
}
