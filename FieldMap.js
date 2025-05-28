function getZoneIds(minX, maxX, minY, maxY) {
    const zoneIds = new Set();

    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            const zoneId = Math.floor((x / 32)) + Math.floor(64 * (y / 32));
            zoneIds.add(zoneId);
        }
    }

    return Array.from(zoneIds);
}