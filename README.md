# Travel Project 🧳

مشروع ويب يربط بين React في الواجهة الأمامية (frontend) و Laravel في الواجهة الخلفية (backend).  
يسمح للوكالات السياحية وأندية المغامرات بنشر عروضهم، ويسمح للمستخدمين باستكشافها وحجزها.

---

## 📁 هيكل المشروع


---

## ⚙️ كيفية التشغيل

### 1. تشغيل الواجهة الأمامية (React)

- تأكد من أنك مثبت Node.js على جهازك.  
  إذا ما كنتش مثبتها، حملها من [هنا](https://nodejs.org/).

#### الخطوات:

1. افتح الطرفية (Terminal) وروح لمجلد `frontend`:

    ```bash
    cd frontend
    ```

2. ثبت جميع الحزم اللازمة:

    ```bash
    npm install
    ```

3. شغل التطبيق:

    ```bash
    npm run dev
    ```

4. افتح المتصفح وادخل على الرابط التالي:

    [http://localhost:5173](http://localhost:5173) (ولا حسب إعدادات Vite).

---

### 2. تشغيل الواجهة الخلفية (Laravel)

- تأكد من أنك مثبت Composer و PHP على جهازك.
  إذا ما كنتش مثبتها، حملها من [هنا](https://getcomposer.org/) و [هنا](https://www.php.net/).

#### الخطوات:

1. افتح الطرفية وروح لمجلد `backend`:

    ```bash
    cd backend
    ```

2. ثبت جميع الحزم اللازمة:

    ```bash
    composer install
    ```

3. انسخ إعدادات البيئة:

    ```bash
    cp .env.example .env
    ```

4. مولّ الكود باستخدام المفتاح:

    ```bash
    php artisan key:generate
    ```

5. إعداد قاعدة البيانات (تأكد من أنك مسوي قاعدة بيانات في MySQL مثلاً):

    ```bash
    php artisan migrate --seed
    ```

6. شغل السيرفر المحلي:

    ```bash
    php artisan serve
    ```

7. افتح المتصفح وادخل على الرابط التالي:

    [http://localhost:8000](http://localhost:8000).

---

## 🔗 الربط بين الفرونت والباك

تأكد أنك حاط API base URL في `frontend/.env` بهذا الشكل:

```env
VITE_API_URL=http://localhost:8000/api
