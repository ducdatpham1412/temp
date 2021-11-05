using System.Diagnostics;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Linq;
using System;
using System.Numerics;

public class DigitalFlasks {
    public static int GetCount(List<int> flaskSizes, int waterAvailable, int tankVolume) {
        flaskSizes.Sort((a, b) => b.CompareTo(a));

        if (waterAvailable < tankVolume) return -1;

        int draws = 0;
        int remaining = tankVolume;

        while (remaining > 0) {
            bool used = false;

            foreach (var f in flaskSizes) {
                if (remaining >= f) {
                    int fillAmount = Math.Min(f, remaining);
                    remaining -= fillAmount;
                    waterAvailable -= fillAmount;
                    draws++;

                    used = true;
                    break;
                }
            }

            if (!used) return -1;
        }

        return draws;
    }

    public static void Main(string[] args) {
        var input = new List<int> { 2, 3, 7, 1, 5, 4 };
        Console.WriteLine(GetCount(input, 100, 34));
    }
}
