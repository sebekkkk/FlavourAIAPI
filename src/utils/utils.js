export const htmlForEmailVeryfication = (link, email) => {
    return  `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>FlavorAI — Weryfikacja adresu e-mail</title>

    <!-- Czcionka -->
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" media="screen">

    <style>
        body {
        margin: 0;
        padding: 0;
        background-color: #0b1220;
        font-family: 'JetBrains Mono', monospace;
        }
        a {
        color: inherit;
        text-decoration: none;
        }
        img {
        border: none;
        display: block;
        outline: none;
        }
        table {
        border-collapse: collapse;
        }
        @media only screen and (max-width: 600px) {
        .container {
            width: 100% !important;
        }
        .content {
            padding: 20px !important;
        }
        .button {
            width: 100% !important;
        }
        }
    </style>
    </head>
    <body style="background-color:#0b1220; margin:0; padding:0;">

    <!-- GŁÓWNA STRUKTURA -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#0b1220;">
        <tr>
        <td align="center" style="padding:40px 10px;">

            <!-- KONTAINER -->
            <table class="container" width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px; background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.25)); border-radius:16px; overflow:hidden; box-shadow:0 8px 25px rgba(0,0,0,0.6);">
            
            <!-- NAGŁÓWEK -->
            <tr>
                <td style="background:rgba(0,0,0,0.3); padding:20px 28px; color:#ffffff;">
                <table width="100%">
                    <tr>
                    <td valign="middle" width="60">
                        <img src="https://yourdomain.com/logo.png" alt="FlavorAI" width="50" style="border-radius:10px;">
                    </td>
                    <td valign="middle" style="font-size:18px; font-weight:700;">
                        FlavorAI
                        <div style="font-size:12px; font-weight:400; color:#aee7ff;">Weryfikacja adresu e-mail</div>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>

            <!-- TREŚĆ -->
            <tr>
                <td class="content" style="padding:32px 40px; color:#ffffff; text-align:left;">

                <h2 style="margin-top:0; font-size:24px;">Cześć ${email} 👋</h2>

                <p style="color:#d8efff; line-height:1.6; margin-bottom:20px;">
                    Dziękujemy za rejestrację w <strong>FlavorAI</strong>!  
                    Aby dokończyć proces, potwierdź swój adres e-mail, klikając przycisk poniżej.
                </p>

                <!-- PRZYCISK -->
                <table cellpadding="0" cellspacing="0" role="presentation" style="margin:25px 0;">
                    <tr>
                    <td align="center">
                        <a href="${link}" target="_blank"
                        style="display:inline-block; padding:14px 28px; background:#00ffff; color:#000000; border-radius:12px; font-weight:700; font-size:16px;">
                        Potwierdź adres e-mail
                        </a>
                    </td>
                    </tr>
                </table>

                <!-- KOD WERYFIKACYJNY -->
                <div style="margin-top:10px; background:rgba(255,255,255,0.05); padding:16px; border-radius:10px; text-align:center;">
                    <p style="margin:0 0 10px 0; font-size:14px; color:#aee7ff;">
                    Nie możesz kliknąć przycisku? Użyj tego kodu weryfikacyjnego:
                    </p>
                    <div style="display:inline-block; background:rgba(0,0,0,0.4); color:#00ffff; font-weight:700; padding:10px 18px; border-radius:8px; font-size:18px; letter-spacing:2px;">
                        ${link}
                    </div>
                </div>

                </td>
            </tr>

            <!-- STOPKA -->
            <tr>
            </tr>
            </table>

        </td>
        </tr>
    </table>
    </body>
    </html>
`
}

export const htmlForAccountDeletionByAdmin = (email) => {
  return `
  <!DOCTYPE html>
  <html lang="pl">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>FlavorAI — Konto usunięte</title>

  <!-- Czcionka -->
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" media="screen">

  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0b1220;
      font-family: 'JetBrains Mono', monospace;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    img {
      border: none;
      display: block;
      outline: none;
    }
    table {
      border-collapse: collapse;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
      .content {
        padding: 20px !important;
      }
    }
  </style>
  </head>
  <body style="background-color:#0b1220; margin:0; padding:0;">

  <!-- GŁÓWNA STRUKTURA -->
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#0b1220;">
    <tr>
      <td align="center" style="padding:40px 10px;">

        <!-- KONTAINER -->
        <table class="container" width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px; background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.25)); border-radius:16px; overflow:hidden; box-shadow:0 8px 25px rgba(0,0,0,0.6);">
          
          <!-- NAGŁÓWEK -->
          <tr>
            <td style="background:rgba(0,0,0,0.3); padding:20px 28px; color:#ffffff;">
              <table width="100%">
                <tr>
                  <td valign="middle" width="60">
                    <img src="https://yourdomain.com/logo.png" alt="FlavorAI" width="50" style="border-radius:10px;">
                  </td>
                  <td valign="middle" style="font-size:18px; font-weight:700;">
                    FlavorAI
                    <div style="font-size:12px; font-weight:400; color:#aee7ff;">Informacja o koncie</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- TREŚĆ -->
          <tr>
            <td class="content" style="padding:32px 40px; color:#ffffff; text-align:left;">

              <h2 style="margin-top:0; font-size:24px;">Cześć ${email} 👋</h2>

              <p style="color:#d8efff; line-height:1.6; margin-bottom:20px;">
                Z przykrością informujemy, że Twoje konto w <strong>FlavorAI</strong> zostało usunięte przez administratora systemu.
              </p>

              <p style="color:#aee7ff; line-height:1.6; margin-bottom:20px;">
                Twoje dane zostały trwale usunięte z naszych serwerów zgodnie z polityką prywatności.  
                Nie ma możliwości odzyskania konta ani przywrócenia jego zawartości.
              </p>

              <div style="margin-top:30px; background:rgba(255,255,255,0.05); padding:16px; border-radius:10px; text-align:center;">
                <p style="margin:0; font-size:14px; color:#9ccaff;">
                  Dziękujemy, że korzystałeś z <strong>FlavorAI</strong>.  
                  Mamy nadzieję, że jeszcze się spotkamy 💫
                </p>
              </div>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
  </body>
  </html>
  `;
};


export const htmlForAccountDeletionByUser = (email) => {
  return `
  <!DOCTYPE html>
  <html lang="pl">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>FlavorAI — Konto usunięte</title>

  <!-- Czcionka -->
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" media="screen">

  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0b1220;
      font-family: 'JetBrains Mono', monospace;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    img {
      border: none;
      display: block;
      outline: none;
    }
    table {
      border-collapse: collapse;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
      .content {
        padding: 20px !important;
      }
    }
  </style>
  </head>
  <body style="background-color:#0b1220; margin:0; padding:0;">

  <!-- GŁÓWNA STRUKTURA -->
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#0b1220;">
    <tr>
      <td align="center" style="padding:40px 10px;">

        <!-- KONTAINER -->
        <table class="container" width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px; background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.25)); border-radius:16px; overflow:hidden; box-shadow:0 8px 25px rgba(0,0,0,0.6);">
          
          <!-- NAGŁÓWEK -->
          <tr>
            <td style="background:rgba(0,0,0,0.3); padding:20px 28px; color:#ffffff;">
              <table width="100%">
                <tr>
                  <td valign="middle" width="60">
                    <img src="https://yourdomain.com/logo.png" alt="FlavorAI" width="50" style="border-radius:10px;">
                  </td>
                  <td valign="middle" style="font-size:18px; font-weight:700;">
                    FlavorAI
                    <div style="font-size:12px; font-weight:400; color:#aee7ff;">Informacja o koncie</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- TREŚĆ -->
          <tr>
            <td class="content" style="padding:32px 40px; color:#ffffff; text-align:left;">

              <h2 style="margin-top:0; font-size:24px;">Cześć ${email}👋</h2>

              <p style="color:#d8efff; line-height:1.6; margin-bottom:20px;">
                Z przykrością informujemy, że Twoje konto w <strong>FlavorAI</strong> zostało usunięte przez ciebie :(.
              </p>

              <p style="color:#aee7ff; line-height:1.6; margin-bottom:20px;">
                Twoje dane zostały trwale usunięte z naszych serwerów zgodnie z polityką prywatności.  
                Nie ma możliwości odzyskania konta ani przywrócenia jego zawartości.
              </p>

              <div style="margin-top:30px; background:rgba(255,255,255,0.05); padding:16px; border-radius:10px; text-align:center;">
                <p style="margin:0; font-size:14px; color:#9ccaff;">
                  Dziękujemy, że korzystałeś z <strong>FlavorAI</strong>.  
                  Mamy nadzieję, że jeszcze się spotkamy 💫
                </p>
              </div>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
  </body>
  </html>
  `;
};
