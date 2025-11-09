- ใช้ generate migration file
- มันจะดู diff ระหว่าง schema ที่คุณเขียนใน schema.ts กับ DB (หรือ snapshot ล่าสุด)
- แล้วสร้างไฟล์ migration .sql อัตโนมัติไว้ใน /drizzle/migrations/
- ยังไม่ได้ apply ลง DB นะ แค่ generate ไฟล์
```sh
npx drizzle-kit generate
```
- migrate ขึ้น db
```sh
npx drizzle-kit migrate
```

- ทางลัด มันจะ push ขึ้นไปเลย แต่ไม่แน่นำให้ใช้ เพราะจะไม่มี file migration
```sh
npx drizzle-kit push
```

supabase enable vector extension
```sql
create extension if not exists vector;
```


# Note

`Facebook` ไม่มี Refresh Token มีแต่ Long Life Token จะให้ token ที่มีอายุนานๆเช่น 60 วันมา แล้วถ้าหมดก็ต้องบังคับออกแล้วต่อใหม่

`Google` มี Refresh Token ตอนที่ build url เพื่อยิง auth ต้อง set พวกนี้
```js
url.searchParams.set("access_type", "offline")
url.searchParams.set("prompt", "consent") //for refresh token

// ถ้าไม่ set แล้วไป get refresh token จะเจอแบบนี้ `Missing or invalid 'refresh_token' field`
```

เต็มๆ

```js
 .get('/google/auth', async ({ oauth2 }) => {
        const url = oauth2.createURL("Google",["openid", "email", "profile"])
        url.searchParams.set("access_type", "offline")
        url.searchParams.set("prompt", "consent") //for refresh token 
        return redirect(url.href)
    })
```