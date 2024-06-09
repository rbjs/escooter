# escooter

Ніколи так не віриш у справедливість Закону Мерфі, як під час пошуку електросамоката у годину пік. Блукати далеко бажання нема, а перемикатись між застосунками оренди у надії, що хтось залишить поруч, з часом дратує.

З цього досвіду виникла ідея показати на одній карті всі електросамокати міста Львова незалежно від застосунків оренди.

eScooter – зручний пошук електросамоката у Львові
https://escooter.pages.dev

# features

- Створено web app з картою міста Львова
- Актуальні локації електросамокатів Bolt та eWings відображаються на карті
- Для кожного самокату доступна інформація про заряд батареї та приблизний запас ходу
- Індикатор часу останнього оновлення даних, можливість примусового оновлення
- Одразу зробити замовлення / бронювання самоката, на жаль, технічна можливість відсутня, проте за кнопкою [Перейти] автоматично відкривається відповідний застосунок оренди
- Круги з цифрами показують кластери розташованих поруч самокатів. Якщо клацнути на круг, карта масштабується так, щоб кожен самокат був видний окремо.
- Якщо скористатись геолокацією, карта масштабується таким чином аби показати вашу локацію та принаймні один самокат поруч.

# todo

- доробити PWA
- фонове автоматичне оновлення
- service worker для карти оффлайн
- відстеження появи вільного самоката у визначеному радіусі від користувача
- BikeUA надайте, будь ласка, АРІ -> rbjsxx@gmail.com

## techstack

FE: Angular v14, Leaflet, OpenStreetMap, Mapbox, Mobile Deep Links.