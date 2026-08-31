BEGIN;

ALTER TABLE "Geek" ADD COLUMN "nameKo" TEXT;

UPDATE "Geek"
SET
    "nameKo" = CASE "name"
        WHEN 'Geek in burgundy playing Super Mario' THEN '버건디색 옷을 입고 슈퍼 마리오를 플레이하는 Geek'
        WHEN 'Geek in light green giving a presentation about binary to other geeks' THEN '연두색 옷을 입고 다른 Geek들에게 이진법을 발표하는 Geek'
        WHEN 'Geek in blue looking into a portal' THEN '파란색 옷을 입고 포털 안을 들여다보는 Geek'
        WHEN 'Geek in blue looking out through a portal' THEN '파란색 옷을 입고 포털 밖을 내다보는 Geek'
        WHEN 'Geek in purple wearing a hat watching a robot battle' THEN '모자를 쓰고 로봇 대결을 구경하는 보라색 옷의 Geek'
        WHEN 'Geek in purple with blue hair bowling with beer bottles' THEN '파란 머리에 보라색 옷을 입고 맥주병으로 볼링하는 Geek'
        WHEN 'Geek in white watching a beer-bottle bowling' THEN '흰색 옷을 입고 맥주병 볼링을 구경하는 Geek'
        WHEN 'Geek in a black top with a lambda symbol' THEN '람다 기호가 있는 검은색 상의를 입은 Geek'
        WHEN 'Geek in a black T-shirt with a bagua symbol' THEN '팔괘 무늬가 있는 검은색 티셔츠를 입은 Geek'
        WHEN 'Geek in light green sorting rubber balls by color' THEN '연두색 옷을 입고 고무공을 색깔별로 분류하는 Geek'
        WHEN 'Geek in green watching another geek soldering' THEN '다른 Geek이 납땜하는 모습을 지켜보는 초록색 옷의 Geek'
        WHEN 'Geek in orange soldering a circuit board' THEN '주황색 옷을 입고 회로 기판을 납땜하는 Geek'
        WHEN 'Geek in pink cycling with AR glasses on' THEN 'AR 안경을 쓰고 자전거를 타는 분홍색 옷의 Geek'
        WHEN 'Geek in olive green working on a laptop in a ball pit' THEN '올리브색 옷을 입고 볼풀 안에서 노트북으로 작업하는 Geek'
        WHEN 'Geek taking a nap in a green sleeping bag' THEN '초록색 침낭에서 낮잠 자는 Geek'
        WHEN 'Geek in gray looking sad at a laptop' THEN '회색 옷을 입고 노트북을 보며 슬퍼하는 Geek'
    END
WHERE
    "name" IN (
        'Geek in burgundy playing Super Mario',
        'Geek in light green giving a presentation about binary to other geeks',
        'Geek in blue looking into a portal',
        'Geek in blue looking out through a portal',
        'Geek in purple wearing a hat watching a robot battle',
        'Geek in purple with blue hair bowling with beer bottles',
        'Geek in white watching a beer-bottle bowling',
        'Geek in a black top with a lambda symbol',
        'Geek in a black T-shirt with a bagua symbol',
        'Geek in light green sorting rubber balls by color',
        'Geek in green watching another geek soldering',
        'Geek in orange soldering a circuit board',
        'Geek in pink cycling with AR glasses on',
        'Geek in olive green working on a laptop in a ball pit',
        'Geek taking a nap in a green sleeping bag',
        'Geek in gray looking sad at a laptop'
    );

ALTER TABLE "Geek" ALTER COLUMN "nameKo" SET NOT NULL;

COMMIT;