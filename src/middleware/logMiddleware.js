/**
 * Middleware do logowania kluczowych informacji o przychodzącym żądaniu (req).
 * Należy umieścić to w pliku np. "logRequest.js" lub bezpośrednio w głównym pliku aplikacji.
 */
export const logRequest = (req, res, next) => {
    // Pobranie adresu IP. req.ip lub req.connection.remoteAddress
    // jest standardowe, ale w przypadku proxy/load balancera, 
    // lepiej użyć req.headers['x-forwarded-for'].
    const ip = req.headers['x-forwarded-for'] || 
               req.connection.remoteAddress || 
               req.socket.remoteAddress || 
               req.ip;

    // Kluczowe informacje o żądaniu
    const logInfo = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        ipAddress: ip,
        userAgent: req.get('User-Agent'), // Nagłówek User-Agent
        protocol: req.protocol,
        // Opcjonalnie: logowanie statusu odpowiedzi po zakończeniu
    };

    // Wypisanie informacji do konsoli
    console.log('----------------------------------------------------');
    console.log(`➡️  NOWE ŻĄDANIE: ${logInfo.method} ${logInfo.url}`);
    console.log(`   🕒 Czas:      ${logInfo.timestamp}`);
    console.log(`   🌐 IP:        ${logInfo.ipAddress}`);
    console.log(`   👤 User-Agent: ${logInfo.userAgent || 'Brak'}`);
    console.log('----------------------------------------------------');

    // Przekazanie kontroli do następnej funkcji middleware/rout'a
    next();
};