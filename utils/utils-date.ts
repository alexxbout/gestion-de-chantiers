export const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const day = dateObj.getDate();
    const month = dateObj.toLocaleDateString("fr-FR", { month: "long" });
    const year = dateObj.getFullYear();
    const weekday = dateObj.toLocaleDateString("fr-FR", { weekday: "long" });

    return `${weekday} ${day} ${month} ${year}`;
};