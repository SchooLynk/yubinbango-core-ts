  interface AddrDicResult {
    region_id: string,
    region: string,
    locality: string,
    street: string,
    extended: string
  }

  type Callback = (args: AddrDicResult) => void;

  type Cache = {
    [key:string]: any; // Add index signature
  }

  class Core {
    URL = 'https://yubinbango.github.io/yubinbango-data/data';
    REGION: Array<string | null> = [
      null, '北海道', '青森県', '岩手県', '宮城県',
      '秋田県', '山形県', '福島県', '茨城県', '栃木県',
      '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
      '新潟県', '富山県', '石川県', '福井県', '山梨県',
      '長野県', '岐阜県', '静岡県', '愛知県', '三重県',
      '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県',
      '和歌山県', '鳥取県', '島根県', '岡山県', '広島県',
      '山口県', '徳島県', '香川県', '愛媛県', '高知県',
      '福岡県', '佐賀県', '長崎県', '熊本県', '大分県',
      '宮崎県', '鹿児島県', '沖縄県'
    ];
    CACHE: Cache = {}
    constructor(inputVal = '', callback?: Callback) {
      if(inputVal){
        // 全角の数字を半角に変換 ハイフンが入っていても数字のみの抽出
        const a:string = inputVal.replace(/[０-９]/g, (s: string) => String.fromCharCode(s.charCodeAt(0) - 65248));
        const b:RegExpMatchArray| null = a.match(/\d/g);
        const c:string = b!.join('');
        const yubin7: string | null = this.chk7(c);
        // 7桁の数字の時のみ作動
        if (!callback) return

        if (yubin7) {
          this.getAddr(yubin7, callback);
          return
        }

        callback(this.addrDic());
      }
    }
    chk7(val: string): string | null {
      if (val.length === 7) {
        return val;
      }
      return null
    }
    addrDic(region_id = '', region = '', locality = '', street = '', extended = ''): AddrDicResult {
      return {
        'region_id': region_id,
        'region': region,
        'locality': locality,
        'street': street,
        'extended': extended
      };
    }
    selectAddr(addr: string[]):AddrDicResult {
      if (addr && addr[0] && addr[1]) {
        const reginIndex = (addr[0] === null || addr[0] === undefined) ? 0 : Number(addr[0])
        return this.addrDic(addr[0],this.REGION[reginIndex] || undefined,addr[1],addr[2],addr[3])
      } else {
        return this.addrDic()
      }
    }
    jsonp(url: string, fn: (data: any) => void): void {
      (window as any)['$yubin'] = (data: any) => fn(data);
      const scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "text/javascript");
      scriptTag.setAttribute("charset", "UTF-8");
      scriptTag.setAttribute("src", url);
      document.head.appendChild(scriptTag);
    }
    getAddr(yubin7: string, fn: Callback): void {
      const yubin3 = yubin7.substring(0, 3);
      // 郵便番号上位3桁でキャッシュデータを確認
      if (yubin3 in this.CACHE && yubin7 in this.CACHE[yubin3]) {
        fn(this.selectAddr(this.CACHE[yubin3][yubin7]));
        return
      }

      this.jsonp(`${this.URL}/${yubin3}.js`, (data) => {
        this.CACHE[yubin3] = data;
        return fn(this.selectAddr(data[yubin7]));
      });
    }
  }

export const YubinBangoCore = Core;
