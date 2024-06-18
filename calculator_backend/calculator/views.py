from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def calculate(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        expression = data.get('expression')
        try:
            result = eval(expression)
            return JsonResponse({'result': result})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)
    
        